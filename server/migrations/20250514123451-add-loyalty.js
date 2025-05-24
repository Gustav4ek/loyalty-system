'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'loyaltyLevel', {
      type: Sequelize.ENUM('STANDARD', 'PREMIUM', 'VIP'),
      defaultValue: 'STANDARD',
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'loyaltyLevel');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_loyaltyLevel";');
  }
};