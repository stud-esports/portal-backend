'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      patronymic: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      photo_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      banned_from_date: {
        type: 'TIMESTAMP',
        allowNull: true,
      },
      banned_to_date: {
        type: 'TIMESTAMP',
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.removeColumn('userRoles', 'userId');
    await queryInterface.dropTable('users');
    // await transaction.commit();
  },
};
