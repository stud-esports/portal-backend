import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { News } from '../../news/entities/news.entity';
import { User } from '../../user/entities/user.entity';
import { Team } from '../../teams/entities/team.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { Application } from '../../applications/entities/application.entity';

interface UniversityCreationAttrs {
  title: string;
  short_name: string;
  logo_url?: string;
  address: string;
  email?: string;
  phone?: string;
  link?: string;
}

interface UniversityAttrs {
  _id: number;
  title: string;
  short_name: string;
  logo_url?: string;
  address: string;
  email?: string;
  phone?: string;
  link?: string;
  // Sequelize Relations
  moderators: User[];
  contacts: Contact[];
  users: User[];
  news: News[];
  teams: Team[];
}

@Table({ tableName: 'universities', createdAt: false, updatedAt: false })
export class University extends Model<
  UniversityAttrs,
  UniversityCreationAttrs
> {
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
    unique: true,
  })
  title: string;

  @ApiProperty({
    example: 'Мос Политех',
    description: 'Краткое название университета',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  short_name: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'E-mail университета' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: '+7(999)9999999',
    description: 'Номер университета',
  })
  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  phone: string;

  @ApiProperty({
    example: 'mospolytech.ru',
    description: 'url главного сайта университета',
  })
  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  link: string;

  @ApiProperty({
    example: '/photos/Image-bcd5.jpg',
    description: 'url, по которому можно получить лого',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  logo_url: string;

  @ApiProperty({
    example: 'г Москва ул Большая Семёновская д 31',
    description: 'Адрес университета',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  // Sequelize Relations

  @HasMany(() => User, 'moderated_university_id')
  moderators: User[];

  @HasMany(() => Contact, 'university_id')
  contacts: Contact[];

  @HasMany(() => User, 'university_id')
  users: User[];

  @HasMany(() => News, 'university_id')
  news: News[];

  @HasMany(() => Team, 'university_id')
  teams: Team[];

  @HasMany(() => Application, 'university_id')
  applications: Application[];
}
