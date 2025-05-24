// models/userAchievement.model.js
module.exports = (sequelize, DataTypes) => {
  const UserAchievement = sequelize.define(
    "UserAchievement",
    {
      // Основные поля
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
      
      // Внешние ключи (указываются в миграции, здесь не обязательны)
      userId: DataTypes.INTEGER,
      achievementId: DataTypes.INTEGER,
    },
    {
      // Опциональные настройки
      timestamps: true, // createdAt и updatedAt добавляются автоматически
      tableName: "UserAchievements", // Явное указание имени таблицы
    }
  );

  // Ассоциации (если нужны дополнительные связи)
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