'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Promotions', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      type: { type: Sequelize.ENUM('route','points','seatType'), allowNull: false },
      conditionValue: { type: Sequelize.STRING },
      pointsCost: { type: Sequelize.INTEGER },
      isUnlimited: { type: Sequelize.BOOLEAN, defaultValue: false },
      startAt: { type: Sequelize.DATE },
      endAt: { type: Sequelize.DATE },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Promotions');
    await queryInterface.sequelize.query("DROP TYPE IF EXISTS \"enum_Promotions_type\";");
  }
};