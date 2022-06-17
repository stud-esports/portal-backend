import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { User } from '../../user/entities/user.entity';
import { Team } from './team.entity';
import { ApiProperty } from '@nestjs/swagger';

interface TeamMemberCreationAttrs {
  team_id: number;
  user_id: number;
}

interface TeamMemberAttrs {
  _id: number;
  team_id: number;
  user_id: number;
  joined_at: Date;
  left_at: Date;
  is_active: boolean;
}

@Table({ tableName: 'team_members', createdAt: false, updatedAt: false })
export class TeamMember extends Model<
  TeamMemberAttrs,
  TeamMemberCreationAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  _id: number;

  @ApiProperty({
    example: new Date('2000-03-03'),
    description: 'Дата вступления в команду',
  })
  @Column({ type: DataType.DATE, allowNull: false })
  joined_at: string;

  @ApiProperty({
    example: new Date('2000-03-03'),
    description: 'Дата ухода из команды',
  })
  @Column({ type: DataType.DATE, allowNull: true })
  left_at: string;

  @ApiProperty({
    example: true,
    description: 'Состоит в команде на данный момент',
  })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  is_active: boolean;

  @ForeignKey(() => Team)
  @Column({
    allowNull: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  team_id: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  user_id: number;
}
