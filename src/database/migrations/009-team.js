'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('teams', {
      _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      members_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      logo_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      team_type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'general',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('teams');
  },
};
