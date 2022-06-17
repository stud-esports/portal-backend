import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Sequelize,
} from 'sequelize-typescript';
import { Team } from 'src/modules/teams/entities/team.entity';
import { University } from 'src/modules/universities/entities/university.entity';
import { User } from 'src/modules/user/entities/user.entity';

interface ApplicationCreationAttrs {
  reason: string;
  university_id?: number;
  applicant_id: number;
  team_id?: number;
}

interface ApplicationAttrs {
  _id: number;
  reason: string;
  is_archived: boolean;
  status: string;
  commentary?: string;
  university_id?: number;
  created_at: string;
  updated_at: string;
  applicant_id: number;
  team_id?: number;
  // Sequelize Relations
  user: User;
  university: University;
  team: Team;
}

@Table({ tableName: 'applications', createdAt: false, updatedAt: false })
export class Application extends Model<
  ApplicationAttrs,
  ApplicationCreationAttrs
> {
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
    example: 'Хочу выступать за свой университет',
    description: 'Мотивация',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  reason: string;

  @ApiProperty({
    example: 'true',
    description: 'Заявка обработана',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_archived: boolean;

  @ApiProperty({
    example: 'pending',
    description: 'Статус заявления на вступление в команду',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'pending',
  })
  status: string;

  @ApiProperty({
    example: 'Не достаточно компетенций',
    description: 'Комментарий к решению рассмотрения заявки',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  commentary: string;

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

  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор создателя заявки',
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  applicant_id: number;

  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор команды',
  })
  @ForeignKey(() => Team)
  @Column({ type: DataType.INTEGER, allowNull: true })
  team_id: number;

  // Sequelize Relations

  @BelongsTo(() => Team, 'team_id')
  team: Team;

  @BelongsTo(() => University, 'university_id')
  university: University;

  @BelongsTo(() => User, 'applicant_id')
  applicant: User;
}
