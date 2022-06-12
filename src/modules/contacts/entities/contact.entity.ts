import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { University } from 'src/modules/universities/entities/university.entity';
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

  @ApiProperty({ example: 1, description: 'Уникальный id пользователя' })
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

  @BelongsTo(() => University)
  university: University;

  @ApiProperty({ example: 1, description: 'id привязанного университета' })
  @ForeignKey(() => University)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  contact_university_id: number;
}
