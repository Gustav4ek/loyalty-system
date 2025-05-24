'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("UserAchievements", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Ссылка на таблицу пользователей
          key: "id",
        },
        onDelete: "CASCADE", // Удалить запись при удалении пользователя
      },
      achievementId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Achievements", // Ссылка на таблицу достижений
          key: "id",
        },
        onDelete: "CASCADE", // Удалить запись при удалении достижения
      },
      progress: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      completedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Уникальный индекс для предотвращения дубликатов
    await queryInterface.addConstraint("UserAchievements", {
      fields: ["userId", "achievementId"],
      type: "unique",
      name: "unique_user_achievement_pair",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("UserAchievements");
  },
};
