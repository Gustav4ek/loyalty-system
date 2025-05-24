const LoyaltyService = require('./loyalty.service');
const loyaltyService = new LoyaltyService(); // <--- добавьте это
const db = require('../models/models');
const { Achievement, UserAchievement } = db;
const { Op } = require('sequelize');
const { startOfMonth, endOfMonth } = require('date-fns'); // можно использовать date-fns

class AchievementService {
  static async checkTripAchievements(userId, order) {
    const achievements = await Achievement.findAll({
      where: { type: ['TRIPS', 'SEAT_TYPE'] }
    });

    for (const achievement of achievements) {
      const condition = {
        userId,
        achievementId: achievement.id
      };

      const [userAchievement] = await UserAchievement.findOrCreate({
        where: condition,
        defaults: { ...condition, progress: 0 }
      });

      if (userAchievement.isCompleted) continue;

      let newProgress = userAchievement.progress;
      
      switch(achievement.type) {
        case 'TRIPS':
          newProgress += 1;
          break;
        case 'SEAT_TYPE':
          if (order.seatType === achievement.seatType) {
            newProgress += 1;
          }
          break;
      }

      if (newProgress >= achievement.target) {
        await loyaltyService.addPoints(
          userId,
          achievement.points,
          `Достижение: ${achievement.title}`
        );
      }

      await userAchievement.update({
        progress: Math.min(newProgress, achievement.target),
        isCompleted: newProgress >= achievement.target,
        completedAt: newProgress >= achievement.target ? new Date() : null
      });
    }
  }

static async checkMonthlyAchievement(userId) {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);

  const ordersThisMonth = await db.Order.count({
    where: {
      userId,
      createdAt: {
        [Op.between]: [start, end]
      }
    }
  });

  const achievement = await Achievement.findOne({
    where: { type: 'MONTHLY' }
  });

  if (!achievement) return;

  const [userAchievement] = await UserAchievement.findOrCreate({
    where: {
      userId,
      achievementId: achievement.id
    },
    defaults: {
      progress: 0
    }
  });

  if (!userAchievement.isCompleted && ordersThisMonth >= achievement.target) {
    await loyaltyService.addPoints(userId, achievement.points, `Достижение: ${achievement.title}`);
    await userAchievement.update({
      progress: achievement.target,
      isCompleted: true,
      completedAt: new Date()
    });
  } else {
    await userAchievement.update({
      progress: Math.min(ordersThisMonth, achievement.target)
    });
  }
}
static async checkRoutesAchievement(userId) {
  const achievement = await Achievement.findOne({
    where: { type: 'ROUTES' }
  });

  if (!achievement) return;

  const orders = await db.Order.findAll({
    where: { userId },
    attributes: ['route']
  });

  const uniqueRoutes = new Set(orders.map(order => order.route));
  const routeCount = uniqueRoutes.size;

  const [userAchievement] = await UserAchievement.findOrCreate({
    where: {
      userId,
      achievementId: achievement.id
    },
    defaults: {
      progress: 0
    }
  });

  if (!userAchievement.isCompleted && routeCount >= achievement.target) {
    await loyaltyService.addPoints(userId, achievement.points, `Достижение: ${achievement.title}`);
    await userAchievement.update({
      progress: achievement.target,
      isCompleted: true,
      completedAt: new Date()
    });
  } else {
    await userAchievement.update({
      progress: Math.min(routeCount, achievement.target)
    });
  }
}

}

module.exports = AchievementService;