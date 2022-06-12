/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { mockApplications } = require('../mocks/applications');
const { mockRoles } = require('../mocks/roles');
const { mockUsers } = require('../mocks/users');
const { mockTeams } = require('../mocks/teams');
const { mockGames } = require('../mocks/games');
const { mockEvents } = require('../mocks/events');
const { mockNews } = require('../mocks/news');
const { mockUniversities } = require('../mocks/universities');
const { mockContacts } = require('../mocks/contacts');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles', mockRoles, {
      returning: true,
    });
    await queryInterface.bulkInsert('universities', mockUniversities, {
      returning: true,
    });
    await queryInterface.bulkInsert('users', mockUsers, {
      returning: true,
    });
    await queryInterface.bulkInsert('news', mockNews, {
      returning: true,
    });
    await queryInterface.bulkInsert('events', mockEvents, {
      returning: true,
    });
    await queryInterface.bulkInsert('games', mockGames, {
      returning: true,
    });
    await queryInterface.bulkInsert('teams', mockTeams, {
      returning: true,
    });
    await queryInterface.bulkInsert('applications', mockApplications, {
      returning: true,
    });
    await queryInterface.bulkInsert('contacts', mockContacts, {
      returning: true,
    });
    let userRolesArr = [];
    const users = (
      await queryInterface.sequelize.query(`SELECT _id, email from users;`)
    )[0];
    const roles = (
      await queryInterface.sequelize.query(`SELECT _id, name from roles;`)
    )[0];
    users.forEach((val) => {
      if (val.email === 'testadmin@mail.ru') {
        userRolesArr.push(
          {
            role_id: roles.find((val) => val.name === 'admin')._id,
            user_id: val._id,
          },
          {
            role_id: roles.find((val) => val.name === 'user')._id,
            user_id: val._id,
          },
        );
      } else if (
        ['testmoder1@mail.ru', 'testmoder2@mail.ru'].includes(val.email)
      ) {
        userRolesArr.push(
          {
            role_id: roles.find((val) => val.name === 'moderator')._id,
            user_id: val._id,
          },
          {
            role_id: roles.find((val) => val.name === 'user')._id,
            user_id: val._id,
          },
        );
      } else {
        userRolesArr.push({
          role_id: roles.find((val) => val.name === 'user')._id,
          user_id: val._id,
        });
      }
    });
    await queryInterface.bulkInsert('users_roles', userRolesArr, {
      returning: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users_roles', null, {
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkDelete('roles', null, {
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkDelete('users', null, {
      truncate: true,
      cascade: true,
    });
  },
};
