module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Orders', 'loyaltyLevel', {
            type: Sequelize.ENUM('BASE', 'STANDARD', 'PREMIUM', 'VIP'),
            defaultValue: 'BASE'
          });
        },

    down: async (queryInterface) => {
            await queryInterface.removeColumn('Orders', 'loyaltyLevel');
        }
}