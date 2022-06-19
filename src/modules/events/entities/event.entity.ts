import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Sequelize,
  HasMany,
} from 'sequelize-typescript';
import { University } from '../../universities/entities/university.entity';
import { User } from '../../user/entities/user.entity';
import { File } from '../../files/entities/file.entity';
import { Game } from '../../games/entities/game.entity';

interface EventCreationAttrs {
  title: string;
  description: string;
  start: string;
  end: string;
  location?: string;
  main_image_url?: string;
  user_id: number;
  university_id?: number;
  game_id?: number;
}

interface EventAttrs {
  _id: number;
  title: string;
  description: string;
  start: string;
  end: string;
  location?: string;
  main_image_url?: string;
  user_id: number;
  university_id?: number;
  game_id?: number;
  created_at: string;
  updated_at: string;
  // Sequelize Relations
  user: User;
  university: University;
  game: Game;
}

@Table({ tableName: 'events', createdAt: false, updatedAt: false })
export class Event extends Model<EventAttrs, EventCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  _id: number;

  @ApiProperty({ example: 'Турнир', description: 'Название события' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: 'Описание турнира', description: 'Описание события' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @ApiProperty({
    example: '2021-05-12T06:57:24.059Z',
    description: 'Дата и время начала события',
  })
  @Column({
    type: 'TIMESTAMP',
    allowNull: false,
  })
  start: string;

  @ApiProperty({
    example: '2021-05-12T06:57:24.059Z',
    description: 'Дата и время конца события',
  })
  @Column({
    type: 'TIMESTAMP',
    allowNull: false,
  })
  end: string;

  @ApiProperty({
    example: 'Московский политех',
    description: 'Место проведения',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  location: string;

  @ApiProperty({ example: '/folder/image.png', description: 'URL фото' })
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
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @ApiProperty({ example: 1, description: 'id игры' })
  @ForeignKey(() => Game)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  game_id: number;

  // Sequelize Relations

  @HasMany(() => File, 'event_id')
  files: File[];

  @BelongsTo(() => University, 'university_id')
  university: University;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @BelongsTo(() => Game, 'game_id')
  game: Game;
}
