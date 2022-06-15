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
import { User } from '../../user/models/user.model';

@Table({ tableName: 'news' })
export class News extends Model {
  @ApiProperty({ example: 1, description: 'Уникальный id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  _id: number;

  @ApiProperty({ example: 'Новости о турнире', description: 'Название' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  title: string;

  @ApiProperty({
    example: 'Краткие итоги по турниру...',
    description: 'Описание',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @ApiProperty({ example: 'Много текста...', description: 'Основной текст' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  text: string;

  @ApiProperty({ example: 123, description: 'Кол-во просмотров' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  watch_count: number;

  @ApiProperty({
    example: 'published',
    description: 'Статус публикации статьи',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  status: string;

  @ApiProperty({ example: 'text', description: 'Описание' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  main_image_url: string;

  @BelongsTo(() => University)
  university: University;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: 1, description: 'id привязанного университета' })
  @ForeignKey(() => University)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  university_id: number;

  @ApiProperty({ example: 1, description: 'id пользователя' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_id: number;
}
