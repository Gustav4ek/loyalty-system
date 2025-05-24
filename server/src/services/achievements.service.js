const LoyaltyService = require('./loyalty.service');
const loyaltyService = new LoyaltyService(); // <--- добавьте это
const db = require('../models/models');
const { Achievement, UserAchievement } = db;


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
}

module.exports = AchievementService;