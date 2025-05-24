'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trainNumber: {
        type: Sequelize.STRING
      },
      route: {
        type: Sequelize.STRING
      },
      departure: {
        type: Sequelize.STRING
      },
      arrival: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL(10, 2)
      },
      seatType: {
        type: Sequelize.STRING
      },
      departureDate: {
        type: Sequelize.DATE
      },
      arrivalDate: {
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Убедись, что таблица называется 'Users'
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      pointsUsed: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      finalPrice: {
        type: Sequelize.DECIMAL(10, 2)
      },
      distance: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};