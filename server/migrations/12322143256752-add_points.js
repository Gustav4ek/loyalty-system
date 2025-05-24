'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_Users_loyaltyLevel" 
      ADD VALUE 'BASE'
    `);
  },
}