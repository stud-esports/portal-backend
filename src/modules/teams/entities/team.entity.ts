import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
  HasOne,
} from 'sequelize-typescript';
import { Application } from 'src/modules/applications/entities/application.entity';
import { Game } from 'src/modules/games/entities/game.entity';
import { University } from 'src/modules/universities/entities/university.entity';
import { User } from 'src/modules/user/models/user.model';
import { TeamMember } from './team_member.entity';

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
  main_image_url: string;

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

  @BelongsToMany(() => User, () => TeamMember)
  members: User[];

  @HasOne(() => Application)
  team_id: Application;

  @BelongsTo(() => University)
  team_university: University;

  @ApiProperty({ example: 'text', description: 'id привязанного университета' })
  @ForeignKey(() => University)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  team_university_id: number;
}
