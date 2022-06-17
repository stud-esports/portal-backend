import {
  HasOne,
  BelongsToMany,
  Column,
  DataType,
  DefaultScope,
  Model,
  Scopes,
  Table,
  BelongsTo,
  ForeignKey,
  Sequelize,
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

// МОДЕЛИ БД
import { UserRoles } from '../../role/entities/user-role.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { Contact } from 'src/modules/contacts/entities/contact.entity';
import { Team } from 'src/modules/teams/entities/team.entity';
import { TeamMember } from 'src/modules/teams/entities/team_member.entity';
import { Application } from 'src/modules/applications/entities/application.entity';
import { University } from 'src/modules/universities/entities/university.entity';
import { File } from '../../files/entities/file.entity';

interface UserCreationAttrs {
  email: string;
  login: string;
  phone: string;
  birth_date: Date;
  photo_url?: string;
  about_yourself?: string;
  first_name: string;
  last_name: string;
  patronymic?: string;
  password: string;
  gender: string;
  student_card?: string;
  university_id?: number;
}

interface UserAttrs {
  _id: number;
  email: string;
  login: string;
  phone: string;
  points: number;
  level: number;
  password: string;
  status: string;
  is_online: boolean;
  last_online: Date;
  first_name: string;
  last_name: string;
  patronymic?: string;
  gender: string;
  birth_date: Date;
  about_yourself?: string;
  student_card?: string;
  university_id?: number;
  photo_url?: string;
  block_reason?: string;
  banned_from_date?: string;
  banned_to_date?: string;
  moderated_university_id?: number;
  created_at: string;
  updated_At: string;
  // Sequelize Relations
  roles: Role[];
  teams: Team[];
  moderated_university: University;
  university: University;
}

@DefaultScope(() => ({
  attributes: { exclude: ['password', 'email', 'phone'] },
  include: [
    {
      model: Role,
      attributes: {
        exclude: ['_id'],
      },
      exclude: [{ model: UserRoles }],
      through: {
        attributes: [],
      },
    },
  ],
}))
@Scopes(() => ({
  withUniversity: {
    include: [
      {
        model: University,
        as: 'moderated_university',
      },
      {
        model: University,
        as: 'university',
      },
    ],
  },
  withTeam: {
    include: [
      {
        model: Team,
        as: 'led_team',
        exclude: [{ model: TeamMember }],
        through: {
          attributes: [],
        },
      },
    ],
  },
  withContact: {
    include: [
      {
        model: Contact,
        as: 'contact',
      },
    ],
  },
  withPhone: {
    attributes: {
      include: ['phone'],
    },
  },
  withEmail: {
    attributes: {
      include: ['email'],
    },
  },
  withPassword: {
    attributes: {
      include: ['password'],
    },
  },
}))
@Table({
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
})
export class User extends Model<UserAttrs, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  _id: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'E-mail' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'testLogin2109', description: 'Логин' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @ApiProperty({
    example: '+7(999)9999999',
    description: 'Мобильный номер пользователя',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  phone: string;

  @ApiProperty({
    example: 1,
    description: 'Уровень пользователя',
  })
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  level: number;

  @ApiProperty({
    example: 0,
    description: 'Кол-во очков',
  })
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  points: number;

  @ApiProperty({ example: 'testPassword1234', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    example: 'active',
    description: 'Статус пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'not_confirmed',
  })
  status: string;

  @ApiProperty({
    example: true,
    description: 'Пользователь в сети',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_online: string;

  @ApiProperty({
    example: '2021-05-12T06:57:24.059Z',
    description: 'Последний раз в сети',
  })
  @Column({
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  last_online: Date;

  @ApiProperty({
    example: 'Иван',
    description: 'Имя',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  first_name: string;

  @ApiProperty({
    example: 'Петров',
    description: 'Фамилия',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  last_name: string;

  @ApiProperty({
    example: 'Петрович',
    description: 'Отчество',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  patronymic: string;

  @ApiProperty({
    example: 'male',
    description: 'Пол',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  gender: string;

  @ApiProperty({
    example: new Date('2000-03-03'),
    description: 'Дата рождения',
  })
  @Column({ type: DataType.DATE, allowNull: false })
  birth_date: string;

  @ApiProperty({
    example: 'Немного текста о себе...',
    description: 'О себе',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  about_yourself: string;

  @ApiProperty({
    example: '123-232-42',
    description: 'Номер студенческого',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  student_card: string;

  @ApiProperty({
    example: '/photos/Image-bcd5.jpg',
    description: 'url, по которому можно получить фото',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  photo_url: string;

  @ApiProperty({
    example: 'Ругается матом в комментариях',
    description: 'Причина блокировки',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  block_reason: string;

  @ApiProperty({
    example: 'text',
    description: 'Дата и время начала блокировки',
  })
  @Column({
    type: 'TIMESTAMP',
    allowNull: true,
  })
  banned_from_date: string;

  @ApiProperty({
    example: 'text',
    description: 'Дата и время окончания блокировки',
  })
  @Column({
    type: 'TIMESTAMP',
    allowNull: true,
  })
  banned_to_date: string;

  @Column({
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
  })
  created_at: string;

  @Column({
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
  })
  updated_at: string;

  @ApiProperty({
    example: 1,
    description: 'id университета, в котором пользователь обучается',
  })
  @ForeignKey(() => University)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  university_id: number;

  @ApiProperty({
    example: 1,
    description: 'id привязанного к модератору университета',
  })
  @ForeignKey(() => University)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  moderated_university_id: number;

  // Sequelize Relations

  @BelongsTo(() => University, 'university_id')
  university: University;

  @BelongsTo(() => University, 'moderated_university_id')
  moderated_university: University;

  @HasMany(() => Application, 'applicant_id')
  applications: Application[];

  @HasMany(() => File, 'user_id')
  files: File[];

  @BelongsToMany(() => Role, () => UserRoles, 'user_id')
  roles: Role[];

  @BelongsToMany(() => Team, () => TeamMember, 'user_id')
  teams: Team[];

  @HasOne(() => Contact, 'user_id')
  contact: Contact;

  @HasOne(() => Team, 'captain_id')
  led_team: Team;
}
