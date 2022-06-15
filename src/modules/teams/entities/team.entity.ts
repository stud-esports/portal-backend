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

  @ApiProperty({ example: 'NAVI', description: 'Название команды' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: 'Просто топчик', description: 'Описание команды' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @ApiProperty({
    example: '/photos/Image-bcd5.jpg',
    description: 'url, по которому можно получить лого',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  logo_url: string;

  @ApiProperty({ example: 'justTeam', description: 'Тип команды' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  team_type: string;

  @ApiProperty({ example: 5, description: 'Количество участников команды' })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  members_count: number;

  @BelongsTo(() => User)
  captain: User;

  @ApiProperty({ example: 1, description: 'id капитана команды' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  captain_id: number;

  @BelongsTo(() => Game)
  game: Game;

  @ApiProperty({ example: 1, description: 'id игры' })
  @ForeignKey(() => Game)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  game_id: number;

  @BelongsToMany(() => User, () => TeamMember)
  members: User[];

  @HasOne(() => Application)
  team_id: Application;

  @BelongsTo(() => University)
  team_university: University;

  @ApiProperty({ example: 1, description: 'id привязанного университета' })
  @ForeignKey(() => University)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  university_id: number;
}
