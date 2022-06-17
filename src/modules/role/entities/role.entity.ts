import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

// МОДЕЛИ БД
import { UserRoles } from './user-role.entity';
import { User } from 'src/modules/user/entities/user.entity';

interface RoleCreationAttrs {
  name: string;
}

interface RoleAttrs {
  _id: number;
  name: string;
  // Sequelize Relations
  users: User[];
}

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class Role extends Model<RoleAttrs, RoleCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  _id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Имя роли' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  // Sequelize Relations

  @BelongsToMany(() => User, () => UserRoles, 'role_id')
  users: User[];
}
