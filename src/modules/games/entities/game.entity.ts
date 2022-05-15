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

  @ApiProperty({ example: 'text', description: 'Жанр' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  genre: string;

  @ApiProperty({ example: 'text', description: 'URL фото' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  main_image_url: string;

  @HasOne(() => Team)
  team: Team;
}
