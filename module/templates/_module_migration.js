'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('<%= table %>', {
    id: { type: Sequelize.STRING, allowNull: false, primaryKey: true },

    // refer to http://docs.sequelizejs.com/manual/migrations.html#migration-skeleton
      // on how to define a migration

    createdAt: { allowNull: false, type: Sequelize.DATE },
    updatedAt: { allowNull: false, type: Sequelize.DATE },

  }),

  down: queryInterface => queryInterface.dropTable('<%= table %>'),
};
