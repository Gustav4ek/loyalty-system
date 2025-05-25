'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Promotions', [{
      title: 'Кофе со скидкой в "Varka"',
      description: '50% НА ЛЮБОЙ КОФЕЙНЫЙ НАПИТОК • 50 баллов',
      type: 'points',
      conditionValue: '50',
      pointsCost: 50,
      isUnlimited: false,
      startAt: new Date('2025-05-05T10:00:00'),
      endAt: new Date('2025-08-09T21:00:00'),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Promotions', null, {});
  }
};
