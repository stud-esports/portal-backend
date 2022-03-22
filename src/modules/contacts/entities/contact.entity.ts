import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/models/user.model';

@Table({ tableName: 'contacts', createdAt: false, updatedAt: false })
export class Contact extends Model {
  @ApiProperty({ example: 1, description: 'Уникальный id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  _id: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  user_id: number;

  @ApiProperty({ example: '1', description: 'Должность пользователя' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  position: string;

  @ApiProperty({
    example: '1',
    description: 'Вопросы, по которым можно обратиться',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  questions: string;
}
