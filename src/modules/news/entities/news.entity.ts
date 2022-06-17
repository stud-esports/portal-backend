import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  HasMany,
  Model,
  Scopes,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { University } from 'src/modules/universities/entities/university.entity';
import { User } from '../../user/entities/user.entity';
import { Event } from '../../events/entities/event.entity';
import { File } from '../../files/entities/file.entity';

interface NewsCreationAttrs {
  title: string;
  description: string;
  text: string;
  main_image_url?: string;
  university_id?: number;
  user_id: number;
  event_id?: number;
}

interface NewsAttrs {
  _id: number;
  title: string;
  description: string;
  text: string;
  main_image_url?: string;
  university_id?: number;
  user_id: number;
  event_id?: number;
  created_at: string;
  updated_At: string;
  // Sequelize Relations
  university: University;
  event: Event;
  user: User;
  files: File[];
}

@DefaultScope(() => ({}))
@Scopes(() => ({
  withUniversity: {
    include: [
      {
        model: University,
        as: 'university',
      },
    ],
  },
  withUser: {
    include: [
      {
        model: User,
        as: 'user',
      },
    ],
  },
  withEvent: {
    include: [
      {
        model: Event,
        as: 'event',
      },
    ],
  },
}))
@Table({ tableName: 'news', createdAt: false, updatedAt: false })
export class News extends Model<NewsAttrs, NewsCreationAttrs> {
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
    allowNull: false,
  })
  description: string;

  @ApiProperty({ example: 'Много текста...', description: 'Основной текст' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
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
    allowNull: false,
    defaultValue: 'created',
  })
  status: string;

  @ApiProperty({
    example: '/photos/Image-bcd5.jpg',
    description: 'url основной картинки',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  main_image_url: string;

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

  @ApiProperty({ example: 1, description: 'id события' })
  @ForeignKey(() => Event)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  event_id: number;

  // Sequelize Relations

  @BelongsTo(() => University, 'university_id')
  university: University;

  @BelongsTo(() => Event, 'event_id')
  event: Event;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @HasMany(() => File, 'news_id')
  files: File[];
}
