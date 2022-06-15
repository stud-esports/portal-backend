'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users_roles', {
      _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users_roles');
  },
};
