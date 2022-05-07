import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Game } from 'src/modules/games/entities/game.entity';
import { User } from 'src/modules/user/models/user.model';

@Table({ tableName: 'teams', createdAt: false, updatedAt: false })
export class Team extends Model {
  @ApiProperty({ example: 1, description: 'Уникальный id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  _id: number;

  @ApiProperty({ example: 'text', description: 'Название' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: 'text', description: 'Описание' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @ApiProperty({ example: 'text', description: 'URL фото' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  logo_url: string;

  @BelongsTo(() => User)
  captain: User;

  @ApiProperty({ example: 1, description: 'id капитана' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  captain_id: number;

  @ApiProperty({ example: 'text', description: 'Тип команды' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  team_type: string;

  @BelongsTo(() => Game)
  game: Game;

  @ApiProperty({ example: 'text', description: 'id игры' })
  @ForeignKey(() => Game)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  game_id: number;

  @ApiProperty({ example: '10', description: 'Количество участников команды' })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  members_count: number;
}
