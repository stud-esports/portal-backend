import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { News } from 'src/modules/news/entities/news.entity';
import { User } from 'src/modules/user/models/user.model';

@Table({ tableName: 'universities', createdAt: false, updatedAt: false })
export class University extends Model {
  @ApiProperty({ example: 1, description: 'Уникальный id университета' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  _id: number;

  @ApiProperty({
    example: 'Московский политехнический университет',
    description: 'Название университета',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @HasOne(() => User)
  moderated_university: User;

  @HasOne(() => News)
  university_id: News;
}
