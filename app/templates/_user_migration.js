'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: { type: Sequelize.STRING, allowNull: false, primaryKey: true },

    name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING },

    createdAt: { allowNull: false, type: Sequelize.DATE },
    updatedAt: { allowNull: false, type: Sequelize.DATE },
  })
  .then(() => queryInterface.addIndex('users', ['email'])),


  down: queryInterface => queryInterface.dropTable('users'),
};
