'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Analyses', 'data', new Sequelize.JSON());
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Analyses', 'data');
  }
};
