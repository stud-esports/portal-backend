import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { User } from '../../user/models/user.model';
import { Team } from './team.entity';

interface TeamMemberCreationAttrs {
  team_id: number;
  user_id: number;
}

interface TeamMemberAttrs {
  _id: number;
  team_id: number;
  user_id: number;
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
