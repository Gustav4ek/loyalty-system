'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Coupons', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' }, onDelete: 'CASCADE' },
      promotionId: { type: Sequelize.INTEGER, references: { model: 'Promotions', key: 'id' }, onDelete: 'SET NULL' },
      code: { type: Sequelize.STRING, allowNull: false, unique: true },
      status: { type: Sequelize.ENUM('ACTIVE','USED','EXPIRED'), allowNull: false, defaultValue: 'ACTIVE' },
      expiryAt: { type: Sequelize.DATE, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Coupons');
    await queryInterface.sequelize.query("DROP TYPE IF EXISTS \"enum_Coupons_status\";");
  }
};