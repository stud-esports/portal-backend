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
      gender: 'м',
      phone: '+79999999992',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'testivan@mail.ru',
      first_name: 'Иван',
      patronymic: 'Петрович',
      last_name: 'Артемьев',
      gender: 'м',
      phone: '+79999999991',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'testvasya@mail.ru',
      first_name: 'Василий',
      patronymic: 'Петрович',
      last_name: 'Воронцов',
      gender: 'м',
      phone: '+79999999993',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'test1@mail.ru',
      first_name: 'Виталий',
      patronymic: 'Александрович',
      last_name: 'Магомедов',
      gender: 'м',
      phone: '+79999999994',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'test2@mail.ru',
      first_name: 'Денис',
      patronymic: 'Сергеевич',
      last_name: 'Денисов',
      gender: 'м',
      phone: '+79999999995',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'test3@mail.ru',
      first_name: 'Сергей',
      patronymic: 'Сергеевич',
      last_name: 'Сократов',
      gender: 'м',
      phone: '+79999999996',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'test4@mail.ru',
      first_name: 'Дарья',
      patronymic: 'Михайловная',
      last_name: 'Одинцова',
      gender: 'ж',
      phone: '+79999999997',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'testv5@mail.ru',
      first_name: 'Марина',
      patronymic: 'Алексеевна',
      last_name: 'Коровкина',
      gender: 'ж',
      phone: '+79999999998',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'test6@mail.ru',
      first_name: 'Юлия',
      patronymic: 'Петровна',
      last_name: 'Шипилова',
      gender: 'ж',
      phone: '+79999999999',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'test7@mail.ru',
      first_name: 'Валерия',
      patronymic: 'Федотовна',
      last_name: 'Березина',
      gender: 'ж',
      phone: '+79999999919',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'test8@mail.ru',
      first_name: 'Ахмед',
      patronymic: 'Магомедович',
      last_name: 'Ахмедов',
      gender: 'м',
      phone: '+79999999929',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'test9@mail.ru',
      first_name: 'Евгений',
      patronymic: 'Сергеевич',
      last_name: 'Онегин',
      gender: 'м',
      phone: '+79999999939',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'test10@mail.ru',
      first_name: 'Андрей',
      patronymic: 'Александрович',
      last_name: 'Аксенов',
      gender: 'м',
      phone: '+79999999949',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'test11@mail.ru',
      first_name: 'Арина',
      patronymic: 'Денисовна',
      last_name: 'Попова',
      gender: 'ж',
      phone: '+79999999959',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'test12@mail.ru',
      first_name: 'Роман',
      patronymic: 'Дмитриевич',
      last_name: 'Римов',
      gender: 'м',
      phone: '+79999999969',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'test13@mail.ru',
      first_name: 'Дмитрий',
      patronymic: 'Андреевич',
      last_name: 'Кузнецов',
      gender: 'м',
      phone: '+79999999979',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'test14@mail.ru',
      first_name: 'Лена',
      patronymic: 'Романовна',
      last_name: 'Захарченко',
      gender: 'ж',
      phone: '+79999999989',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'test15@mail.ru',
      first_name: 'Мария',
      patronymic: 'Владмировна',
      last_name: 'Решетова',
      gender: 'ж',
      phone: '+79999999199',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'test16@mail.ru',
      first_name: 'Василий',
      patronymic: 'Юрьевич',
      last_name: 'Петров',
      gender: 'м',
      phone: '+79999999299',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'test17@mail.ru',
      first_name: 'Владимир',
      patronymic: 'Владмирович',
      last_name: 'Цимбалов',
      gender: 'м',
      phone: '+79999999399',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'test18@mail.ru',
      first_name: 'Семенов',
      patronymic: 'Юрий',
      last_name: 'Колезнев',
      gender: 'м',
      phone: '+79999999499',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'test19@mail.ru',
      first_name: 'Влад',
      patronymic: 'Владиславович',
      last_name: 'Синицын',
      gender: 'м',
      phone: '+79999999599',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
    {
      email: 'test20@mail.ru',
      first_name: 'Вячеслав',
      patronymic: 'Юрьевич',
      last_name: 'Кузьмин',
      gender: 'м',
      phone: '+79999999699',
      photo_url: null,
      password: hashPassword,
      banned_from_date: null,
      banned_to_date: null,
      block_reason: '',
    },
  ],
};
