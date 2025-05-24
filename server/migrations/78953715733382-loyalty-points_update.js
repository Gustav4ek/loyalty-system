'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const enumCheck = await queryInterface.sequelize.query(`
    SELECT EXISTS (
      SELECT 1 FROM pg_type 
      WHERE typname = 'enum_LoyaltyPoints_type'
    )
  `, { type: queryInterface.sequelize.QueryTypes.SELECT });

  if (!enumCheck[0].exists) {
    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_LoyaltyPoints_type" 
      AS ENUM ('ACCRUAL', 'REDEMPTION')
    `);
  }

    // 2. Создать таблицу
    await queryInterface.createTable('LoyaltyPoints', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      type: {
        type: '"enum_LoyaltyPoints_type"',
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    // 1. Удалить таблицу
    await queryInterface.dropTable('LoyaltyPoints');
    
    // 2. Удалить тип ENUM
    await queryInterface.sequelize.query(`
      DROP TYPE "enum_LoyaltyPoints_type"
    `);
  }
};