'use strict';

const crypto = require('crypto');

function generateReferralCode() {
  // Простая функция для генерации случайного кода длиной 8 символов, заглавные буквы и цифры
  return crypto.randomBytes(4).toString('hex').toUpperCase();
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'referralCode', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });

    await queryInterface.addColumn('Users', 'referredById', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    // Получаем всех пользователей
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`
    );

    const userIds = users[0];

    // Для каждого пользователя генерируем уникальный referralCode
    for (const user of userIds) {
      let code;
      let isUnique = false;

      // Генерируем и проверяем уникальность кода
      while (!isUnique) {
        code = generateReferralCode();
        const [[existingUser]] = await queryInterface.sequelize.query(
          `SELECT id FROM "Users" WHERE "referralCode" = '${code}' LIMIT 1;`
        );
        if (!existingUser) isUnique = true;
      }

      // Обновляем пользователя
      await queryInterface.sequelize.query(
        `UPDATE "Users" SET "referralCode" = '${code}' WHERE id = ${user.id};`
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'referredById');
    await queryInterface.removeColumn('Users', 'referralCode');
  }
};