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
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
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
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birth_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      about_yourself: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      student_card: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      photo_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      block_reason: {
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
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
