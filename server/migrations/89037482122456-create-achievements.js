'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Achievements', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false
        },
        target: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        type: {
          type: Sequelize.ENUM('TRIPS', 'SEAT_TYPE', 'MONTHLY', 'FRIENDS', 'ROUTES'),
          allowNull: false
        },
        seatType: {
          type: Sequelize.STRING,
          allowNull: true
        },
        points: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        icon: {
          type: Sequelize.STRING,
          allowNull: false
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
    },
  
    down: async (queryInterface) => {
      await queryInterface.dropTable('Achievements');
      await queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_Achievements_type";'
      );
    }
  };