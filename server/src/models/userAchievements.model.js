// models/userAchievement.model.js
module.exports = (sequelize, DataTypes) => {
  const UserAchievement = sequelize.define(
    "UserAchievement",
    {
      progress: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      completedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      

      userId: DataTypes.INTEGER,
      achievementId: DataTypes.INTEGER,
    },
    {

      timestamps: true,
      tableName: "UserAchievements",
    }
  );

  UserAchievement.associate = (models) => {
    UserAchievement.belongsTo(models.User, {
      foreignKey: "userId",

    });
    UserAchievement.belongsTo(models.Achievement, {
      foreignKey: "achievementId",

    });
  };

  return UserAchievement;
};