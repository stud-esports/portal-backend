import {
  BelongsToMany,
  Column,
  DataType,
  DefaultScope,
  Model,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

// МОДЕЛИ БД
import { UserRoles } from '../../role/models/user-role.model';
import { Role } from 'src/modules/role/models/role.model';

interface UserCreationAttrs {
  email: string;
  first_name: string;
  last_name: string;
  patronymic: string;
  password: string;
}

interface UserAttrs {
  _id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  patronymic: string;
  roles: Role[];
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
  @Column({ type: DataType.STRING, allowNull: false })
  patronymic: string;

  @ApiProperty({
    example: 'Петров',
    description: 'Фамилия',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  last_name: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'E-mail' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'testPassword1234', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
