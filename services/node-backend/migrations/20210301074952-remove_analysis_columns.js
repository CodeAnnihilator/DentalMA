'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Analyses', 'mq');
    await queryInterface.removeColumn('Analyses', 'value');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Analyses', 'mq', Sequelize.BOOLEAN);
    await queryInterface.addColumn('Analyses', 'value', Sequelize.BOOLEAN);
  }
};
