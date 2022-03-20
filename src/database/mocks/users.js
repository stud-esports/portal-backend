'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

const hashPassword = bcrypt.hashSync('password', 10);

module.exports = {
  mockUsers: [
    {
      email: 'testadmin@mail.ru',
      first_name: 'Никита',
      patronymic: 'Петрович',
      last_name: 'Петров',
      phone: '+79999999999',
      photo_url: null,
      password: hashPassword,
    },
    {
      email: 'testivan@mail.ru',
      first_name: 'Иван',
      patronymic: 'Петрович',
      last_name: 'Артемьев',
      phone: '+79999999999',
      photo_url: null,
      password: hashPassword,
    },
    {
      email: 'testvasya@mail.ru',
      first_name: 'Василий',
      patronymic: 'Петрович',
      last_name: 'Воронцов',
      phone: '+79999999999',
      photo_url: null,
      password: hashPassword,
    },
  ],
};
