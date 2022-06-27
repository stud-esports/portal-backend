import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { Team } from '../../teams/entities/team.entity';
import { Event } from '../../events/entities/event.entity';

interface GameCreationAttrs {
  title: string;
  short_title: string;
  description?: string;
  genre: string;
  store_url?: string;
  main_image_url?: string;
  background_image_url?: string;
}

interface GameAttrs {
  _id: number;
  title: string;
  short_title: string;
  description?: string;
  genre: string;
  store_url?: string;
  main_image_url?: string;
  background_image_url?: string;
  // Sequelize Relations
  teams: Team[];
  events: Event[];
}

@Table({ tableName: 'games', createdAt: false, updatedAt: false })
export class Game extends Model<GameAttrs, GameCreationAttrs> {
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
    example: 'Contre Strike: Global Offensive',
    description: 'Название игры (дисциплины)',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  title: string;

  @ApiProperty({
    example: 'CS: GO',
    description: 'Короткое название дисциплины (игры)',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  short_title: string;

  @ApiProperty({
    example: 'Короткое описание...',
    description: 'Описание дисциплины (игры)',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @ApiProperty({ example: 'shooter', description: 'Жанр дисциплины (игры)' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  genre: string;

  @ApiProperty({
    example: 'https://steam.com/game/cs-go',
    description: 'URL игры в магазине',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  store_url: string;

  @ApiProperty({
    example: '/photos/Image-bcd5.jpg',
    description: 'URL фото игры',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  main_image_url: string;

  @ApiProperty({
    example: '/photos/Image-bcd5.jpg',
    description: 'URL бэкграунда игры',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  background_image_url: string;

  // Sequelize Relations

  @HasMany(() => Team, 'game_id')
  teams: Team[];

  @HasMany(() => Event, 'game_id')
  events: Event[];
}
