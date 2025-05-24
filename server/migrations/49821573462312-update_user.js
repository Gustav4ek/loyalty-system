'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.addColumn('Users', 'birthDate', {
        type: Sequelize.DATEONLY,
        allowNull: true
      });
      await queryInterface.addColumn('Users', 'cardNumber', {
        type: Sequelize.STRING(20),
        defaultValue: ''
      });
    },
  
    async down(queryInterface) {
      await queryInterface.removeColumn('Users', 'birthDate');
      await queryInterface.removeColumn('Users', 'cardNumber');
    }
  };