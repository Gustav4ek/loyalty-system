
'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Orders', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        trainNumber: Sequelize.STRING,
        route: Sequelize.STRING,
        departure: Sequelize.STRING,
        arrival: Sequelize.STRING,
        duration: Sequelize.STRING,
        type: Sequelize.STRING,
        price: Sequelize.DECIMAL(10, 2),
        seatType: Sequelize.STRING,
        departureDate: Sequelize.DATE,
        arrivalDate: Sequelize.DATE,
        userId: {
          type: Sequelize.INTEGER,
          references: { model: 'Users', key: 'id' }
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('Orders');
    }
  };