'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('UserAchievements', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        achievementId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Achievements',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        progress: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        isCompleted: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        completedAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        }
      });
  
      // Добавляем композитный уникальный индекс
      await queryInterface.addIndex('UserAchievements', {
        fields: ['userId', 'achievementId'],
        unique: true,
        name: 'user_achievement_unique'
      });
    },
  
    down: async (queryInterface) => {
      await queryInterface.removeIndex('UserAchievements', 'user_achievement_unique');
      await queryInterface.dropTable('UserAchievements');
    }
  };