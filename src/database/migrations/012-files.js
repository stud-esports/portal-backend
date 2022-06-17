'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('files', {
      _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      fullPath: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('files');
  },
};
