'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Rooms', 'isBookedOn', {
      type: 'TIMESTAMP WITH TIME ZONE USING "isBookedOn"::timestamp with time zone',
      allowNull: true,
    });

    await queryInterface.changeColumn('Rooms', 'isBookedUntil', {
      type: 'TIMESTAMP WITH TIME ZONE USING "isBookedUntil"::timestamp with time zone',
      allowNull: true,
    });

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.changeColumn('Rooms', 'isBookedOn', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('Rooms', 'isBookedUntil', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};