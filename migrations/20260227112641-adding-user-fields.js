'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'bookings', { type: Sequelize.ARRAY(Sequelize.STRING) });
    await queryInterface.addColumn('Users', 'name', { type: Sequelize.STRING });
    await queryInterface.addColumn('Users', 'surname', { type: Sequelize.STRING });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'bookings');
    await queryInterface.removeColumn('Users', 'name');
    await queryInterface.removeColumn('Users', 'surname');
  }
};
