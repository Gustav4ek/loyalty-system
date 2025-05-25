const { DataTypes } = require('sequelize');
const db = require('../models/models');
const { sequelize, LoyaltyPoint, User } = db;

class LoyaltyService {

  async getFullHistory(userId) {

    return LoyaltyPoint.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'amount', 'type', 'description', 'createdAt']
    });
  }

  async addPointsTransaction(userId, amount, description, transaction) {
    const type = amount > 0 ? 'ACCRUAL' : 'REDEMPTION';
    
    await LoyaltyPoint.create({
      userId,
      amount: Math.abs(amount),
      type,
      description
    }, { transaction });

  }
    async addPoints(userId, amount, description, transaction) {
          
          const type = amount > 0 ? 'ACCRUAL' : 'REDEMPTION';
    
          if (amount < 0) {
            const currentBalance = await this.getBalance(userId);
            if (currentBalance < Math.abs(amount)) {
              throw new Error('Недостаточно баллов для списания');
            }
          }
        
          await LoyaltyPoint.create({
            userId,
            amount: Math.abs(amount),
            type,
            description
          }, { transaction });
    
          if (type === 'ACCRUAL') {
            await User.increment('lifetimePoints', {
              by: Math.abs(amount),
              where: { id: userId },
              transaction
            });
          }
    
          const user = await User.findByPk(userId, { transaction });
          await this.updateLoyaltyLevel(user, transaction);
          return user.lifetimePoints;
        }
    
  
    async getBalance(userId) {
        const result = await sequelize.query(`
          SELECT SUM(
            CASE 
              WHEN type = 'ACCRUAL' THEN amount 
              ELSE -amount 
            END
          ) as balance
          FROM "LoyaltyPoints"
          WHERE "userId" = :userId
        `, {
          replacements: { userId },
          type: sequelize.QueryTypes.SELECT
        });
        
        return Number(result[0].balance) || 0;
    }
  
      async updateLoyaltyLevel(user, transaction) {
        let level = 'BASE';
        const points = user.lifetimePoints;
        
        if (points >= 800) level = 'VIP';
        else if (points >= 500) level = 'PREMIUM';
        else if (points >= 200) level = 'STANDARD';
    
        await user.update({ loyaltyLevel: level }, { transaction });
      }

      async getLifetimePoints(userId) {
        const user = await User.findByPk(userId, {
          attributes: ['lifetimePoints']
        });
        return user.lifetimePoints;
      }

      calculateNextLevel(lifetimePoints) {
        const levels = [
          { points: 200, name: 'Стандарт' },
          { points: 500, name: 'Премиум' },
          { points: 800, name: 'VIP' }
        ];
      
        const nextLevel = levels.find(level => lifetimePoints < level.points);
        
        return nextLevel ? {
          name: nextLevel.name,
          requiredPoints: nextLevel.points - lifetimePoints
        } : {
          name: 'VIP',
          requiredPoints: 0
        };
      }

      async getLoyaltyData(userId) {
        const [balance, user] = await Promise.all([
          this.getBalance(userId),
          User.findByPk(userId, {
            attributes: ['loyaltyLevel', 'lifetimePoints']
          })
        ]);
        
        return {
          currentBalance: balance,
          loyaltyLevel: user.loyaltyLevel,
          lifetimePoints: user.lifetimePoints,
          nextLevel: this.calculateNextLevel(user.lifetimePoints)
        };
      }
  }

module.exports = LoyaltyService;