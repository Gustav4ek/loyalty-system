'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Promotions', 'loyaltyRequired', {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isIn: [['BASE', 'STANDARD', 'PREMIUM', 'VIP']]
      }
    });

    await queryInterface.addColumn('Promotions', 'discountPercent', {
      type: Sequelize.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 100
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Promotions', 'loyaltyRequired');
    await queryInterface.removeColumn('Promotions', 'discountPercent');
  }
};
