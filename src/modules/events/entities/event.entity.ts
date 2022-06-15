import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { University } from 'src/modules/universities/entities/university.entity';

@Table({ tableName: 'events' })
export class Event extends Model {
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

  @ApiProperty({ example: 'text', description: 'Дата и время' })
  @Column({
    type: 'TIMESTAMP',
    allowNull: false,
  })
  start: string;

  @ApiProperty({ example: 'text', description: 'Дата и время' })
  @Column({
    type: 'TIMESTAMP',
    allowNull: false,
  })
  end: string;

  @ApiProperty({
    example: 'Московский политех',
    description: 'Место проведения',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  location: string;

  @ApiProperty({ example: 'text', description: 'URL фото' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  main_image_url: string;

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
  event_university: University;

  @ApiProperty({ example: 1, description: 'id привязанного университета' })
  @ForeignKey(() => University)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  event_university_id: number;
}
