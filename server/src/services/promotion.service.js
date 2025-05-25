
const LoyaltyService = require('./loyalty.service');
const uuid = require('uuid').v4;
const db = require('../models/models');
const { Promotion, Coupon, Order, User, sequelize } = db;
const { Op } = require('sequelize');


class PromotionService {
    async listAvailable(userId) {
        const user = await User.findByPk(userId, {
          attributes: ['loyaltyLevel']
        });
      
        const loyaltyRanks = ['BASE', 'STANDARD', 'PREMIUM', 'VIP'];
        const userRank = loyaltyRanks.indexOf(user.loyaltyLevel);
        const availableLevels = loyaltyRanks.slice(0, userRank + 1);
      
        const now = new Date();
      
        return await Promotion.findAll({
          where: {
            [Op.and]: [
              {
                [Op.or]: [
                  { loyaltyRequired: null },
                  { loyaltyRequired: { [Op.in]: availableLevels } }
                ]
              },
              {
                [Op.or]: [
                  { isUnlimited: true },
                  {
                    startAt: { [Op.lte]: now },
                    endAt: { [Op.gte]: now }
                  }
                ]
              }
            ]
          },
          order: [['createdAt', 'DESC']]
        });
      }

  async redeem(userId, promotionId) {
    return sequelize.transaction(async tx => {
      const promo = await Promotion.findByPk(promotionId, { transaction: tx });
      switch(promo.type) {
        case 'route':
          const hasOrder = await Order.count({ where: { userId, route: promo.conditionValue }, transaction: tx });
          if (!hasOrder) throw new Error('Условие по направлению не выполнено');
          break;
        case 'points':
          const loyalty = new LoyaltyService();
          await loyalty.addPoints(userId, -promo.pointsCost, `Списание за купон ${promo.title}`, tx);
          break;
        case 'seatType':
          const hasBiz = await Order.count({ where: { userId, seatType: promo.conditionValue }, transaction: tx });
          if (!hasBiz) throw new Error('Условие по типу места не выполнено');
          break;
      }
      const code = uuid().split('-')[0].toUpperCase();
      const expiryAt = promo.isUnlimited ? new Date(Date.now() + 365*24*3600*1000) : promo.endAt;
      await Coupon.create({ userId, promotionId, code, expiryAt, status: 'ACTIVE' }, { transaction: tx });
      if (!promo.isUnlimited) await promo.destroy({ transaction: tx });
      return { code, expiryAt };
    });
  }
}

module.exports = PromotionService;