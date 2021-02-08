'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = await queryInterface.sequelize.query(
      `SELECT * FROM "Users"`
    );

    if (users[0].length) return;

    await queryInterface.bulkInsert('Users', [{
      name: 'Uwe',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
