import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Team } from 'src/modules/teams/entities/team.entity';
import { University } from 'src/modules/universities/entities/university.entity';
import { User } from 'src/modules/user/models/user.model';

@Table({ tableName: 'applications', createdAt: false, updatedAt: false })
export class Application extends Model {
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

  @BelongsTo(() => User)
  applicant: User;

  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор создателя заявки',
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  applicant_id: number;

  @BelongsTo(() => Team)
  team: Team;

  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор команды',
  })
  @ForeignKey(() => Team)
  @Column({ type: DataType.INTEGER, allowNull: false })
  team_id: number;

  @ApiProperty({
    example: 'true',
    description: 'Заявка обработана',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_archived: boolean;

  @ApiProperty({
    example: 'На рассмотрении',
    description: 'Статус заявления на вступление в команду',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
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
  })
  createdAt: string;

  @Column({
    type: 'TIMESTAMP',
    allowNull: false,
  })
  updatedAt: string;

  @BelongsTo(() => University)
  application_university: University;

  @ApiProperty({ example: 'text', description: 'id привязанного университета' })
  @ForeignKey(() => University)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  application_university_id: number;
}
