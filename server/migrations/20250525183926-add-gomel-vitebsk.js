'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Promotions', [
      {
        title: 'Индивидуальная скидка 20% на билет Гомель - Витебск',
        description: 'Только для PREMIUM и VIP клиентов',
        type: 'route',
        conditionValue: 'Гомель - Витебск',
        discountPercent: 20,
        loyaltyRequired: 'PREMIUM',
        startAt: new Date(),
        endAt: new Date('2025-12-31'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Promotions', {
      title: 'Индивидуальная скидка 20% на билет Гомель - Витебск'
    });
  }
};
