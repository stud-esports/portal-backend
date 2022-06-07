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
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

// МОДЕЛИ БД
import { UserRoles } from '../../role/models/user-role.model';
import { Role } from 'src/modules/role/models/role.model';
import { Contact } from 'src/modules/contacts/entities/contact.entity';
import { Team } from 'src/modules/teams/entities/team.entity';
import { TeamMember } from 'src/modules/teams/entities/team_member.entity';
import { Application } from 'src/modules/applications/entities/application.entity';
import { University } from 'src/modules/universities/entities/university.entity';

interface UserCreationAttrs {
  email: string;
  first_name: string;
  last_name: string;
  patronymic: string;
  password: string;
  banned_from_date: string;
  banned_to_date: string;
  gender: string;
  moderated_university_id: number;
}

interface UserAttrs {
  _id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  patronymic: string;
  roles: Role[];
  banned_from_date: string;
  banned_to_date: string;
  gender: string;
  moderated_university_id: number;
}

@DefaultScope(() => ({
  attributes: { exclude: ['password'] },
}))
@Scopes(() => ({
  withPassword: {},
  withRole: {
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
      {
        model: University,
        as: 'moderated_university',
      },
      // {
      //   model: Team,
      //   attributes: {
      //     exclude: ['_id'],
      //   },
      //   exclude: [{ model: TeamMember }],
      //   through: {
      //     attributes: [],
      //   },
      // },
    ],
  },
  allUsers: {
    attributes: {
      exclude: ['password', 'email'],
    },
  },
}))
@Table({ tableName: 'users', createdAt: false, updatedAt: false })
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

  @ApiProperty({
    example: 'Иван',
    description: 'Имя',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  first_name: string;

  @ApiProperty({
    example: 'Петрович',
    description: 'Отчество',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  patronymic: string;

  @ApiProperty({
    example: 'Петров',
    description: 'Фамилия',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  last_name: string;

  @ApiProperty({
    example: 'м',
    description: 'Пол',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  gender: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'E-mail' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'testPassword1234', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @BelongsToMany(() => Team, () => TeamMember)
  teams: Team[];

  @ApiProperty({
    example: '+7(999)9999999',
    description: 'Мобильный номер пользователя',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  phone: string;

  @ApiProperty({
    example: '/photos/Image-bcd5.jpg',
    description: 'url, по которому можно получить фото',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  photo_url: string;

  @HasOne(() => Contact)
  contact: Contact;

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

  @ApiProperty({
    example: 'Ругается матом в комментариях',
    description: 'Причина блокировки',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  block_reason: string;

  @HasOne(() => Team)
  captain: Team;

  @HasOne(() => Application)
  applicant_id: Application;

  @BelongsTo(() => University)
  moderated_university: University;

  @ApiProperty({
    example: '1',
    description: 'id привязанного к модератору университета',
  })
  @ForeignKey(() => University)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  moderated_university_id: number;
}
