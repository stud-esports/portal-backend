import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Application } from 'src/modules/applications/entities/application.entity';
import { Game } from 'src/modules/games/entities/game.entity';
import { University } from 'src/modules/universities/entities/university.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { TeamMember } from './team_member.entity';

interface TeamCreationAttrs {
  title: string;
  description?: string;
  members_count: number;
  team_type?: string;
  logo_url?: string;
  university_id?: number;
  game_id: number;
  captain_id: number;
}

interface TeamAttrs {
  _id: number;
  title: string;
  description?: string;
  members_count: number;
  team_type: string;
  logo_url?: string;
  university_id?: number;
  game_id: number;
  captain_id: number;
  // Sequelize Relations
  captain: User;
  game: Game;
  members: User[];
  university: University;
  applications: Application[];
}

@Table({ tableName: 'teams', createdAt: false, updatedAt: false })
export class Team extends Model<TeamAttrs, TeamCreationAttrs> {
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
    unique: true,
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

  @ApiProperty({ example: 'general', description: 'Тип команды' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'general',
  })
  team_type: string;

  @ApiProperty({ example: 5, description: 'Количество участников команды' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  members_count: number;

  @ApiProperty({ example: 1, description: 'id капитана команды' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  captain_id: number;

  @ApiProperty({ example: 1, description: 'id игры' })
  @ForeignKey(() => Game)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  game_id: number;

  @ApiProperty({ example: 1, description: 'id привязанного университета' })
  @ForeignKey(() => University)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  university_id: number;

  // Sequelize Relations

  @BelongsTo(() => User, 'captain_id')
  captain: User;

  @BelongsTo(() => Game, 'game_id')
  game: Game;

  @BelongsToMany(() => User, () => TeamMember, 'team_id')
  members: User[];

  @BelongsTo(() => University, 'university_id')
  university: University;

  @HasMany(() => Application)
  applications: Application[];
}
