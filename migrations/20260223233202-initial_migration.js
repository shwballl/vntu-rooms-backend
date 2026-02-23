'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Rooms', 'isBookedOn', { type: Sequelize.STRING });
    await queryInterface.addColumn('Rooms', 'isBookedUntil', { type: Sequelize.STRING });
    await queryInterface.removeColumn('Rooms', 'isBooked');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Rooms', 'isBookedOn');
    await queryInterface.removeColumn('Rooms', 'isBookedUntil');
  }
};
