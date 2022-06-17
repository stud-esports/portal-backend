import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { Event } from '../../events/entities/event.entity';
import { News } from '../../news/entities/news.entity';

interface FileCreationAttrs {
  fileName: string;
  fullPath: string;
  user_id: number;
  event_id?: number;
  news_id?: number;
}

interface FileAttrs {
  _id: number;
  fileName: string;
  fullPath: string;
  user_id: number;
  event_id?: number;
  news_id?: number;
  created_at: string;
  updated_at: string;
  // Sequelize Relations
  user: User;
  event: Event;
  news: News;
}

@Table({ tableName: 'files', createdAt: false, updatedAt: false })
export class File extends Model<FileAttrs, FileCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  _id: number;

  @ApiProperty({ example: 'text.png', description: 'Название файла' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  fileName: string;

  @ApiProperty({
    example: '/folder/text.png',
    description: 'Полный путь к файлу',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullPath: string;

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

  @ApiProperty({ example: 1, description: 'id пользователя' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @ApiProperty({ example: 1, description: 'id события' })
  @ForeignKey(() => Event)
  @Column({ type: DataType.INTEGER, allowNull: false })
  event_id: number;

  @ApiProperty({ example: 1, description: 'id статьи' })
  @ForeignKey(() => News)
  @Column({ type: DataType.INTEGER, allowNull: false })
  news_id: number;

  // Sequelize Relations

  @BelongsTo(() => User, 'user_id')
  user: User;

  @BelongsTo(() => Event, 'event_id')
  event: Event;

  @BelongsTo(() => News, 'news_id')
  news: News;
}
