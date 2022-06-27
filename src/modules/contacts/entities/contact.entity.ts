import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { University } from '../../universities/entities/university.entity';
import { User } from '../../user/entities/user.entity';

interface ContactCreationAttrs {
  position: string;
  questions: string;
  university_id?: number;
  user_id: number;
}

interface ContactAttrs {
  _id: number;
  position: string;
  questions: string;
  university_id?: number;
  user_id: number;
  // Sequelize Relations
  user: User;
  university: University;
}

@DefaultScope(() => ({
  include: [
    {
      model: User,
      as: 'user',
    },
  ],
}))
@Table({ tableName: 'contacts', createdAt: false, updatedAt: false })
export class Contact extends Model<ContactAttrs, ContactCreationAttrs> {
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
    example: 'Старший преподаватель',
    description: 'Должность пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  position: string;

  @ApiProperty({
    example: 'Как попасть в сборную? Кто скрывается под маской Бэтмена?',
    description: 'Вопросы, по которым можно обратиться',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  questions: string;

  @ApiProperty({ example: 1, description: 'Уникальный id пользователя' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  user_id: number;

  @ApiProperty({ example: 1, description: 'id привязанного университета' })
  @ForeignKey(() => University)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  university_id: number;

  // Sequelize Relations

  @BelongsTo(() => User, 'user_id')
  user: User;

  @BelongsTo(() => University, 'university_id')
  university: University;
}
