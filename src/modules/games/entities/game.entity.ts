import { ApiProperty } from '@nestjs/swagger';
import { Table, Model, Column, DataType, HasOne } from 'sequelize-typescript';
import { Team } from 'src/modules/teams/entities/team.entity';

@Table({ tableName: 'games', createdAt: false, updatedAt: false })
export class Game extends Model {
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
    description: 'Название',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  title: string;

  @ApiProperty({ example: 'CS: GO', description: 'Название' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  short_title: string;

  @ApiProperty({ example: 'text', description: 'Описание' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @ApiProperty({ example: 'shooter', description: 'Жанр' })
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

  @HasOne(() => Team)
  team: Team;
}
