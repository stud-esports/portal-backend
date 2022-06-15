'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('refresh_tokens', {
      _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      is_revoked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fingerprint: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expires: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('refresh_tokens');
  },
};
