import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsMobilePhone,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: 'testLogin2208', description: 'Логин' })
  @IsString({ message: 'Должно быть строкой' })
  readonly login: string;

  @ApiProperty({
    example: '+7(999)9999999',
    description: 'Мобильный номер пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsMobilePhone('ru-RU', undefined, {
    message: 'Должно быть мобильным номером',
  })
  readonly phone: string;

  @ApiProperty({
    example: new Date('2000-03-04'),
    description: 'Дата рождения пользователя',
  })
  @IsDate({ message: 'Должно быть датой' })
  readonly birth_date: Date;

  @ApiProperty({ example: '12345678', description: 'пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(8, 16, { message: 'Не меньше 8 и не больше 16' })
  readonly password: string;

  @ApiProperty({ example: 'Иван', description: 'имя' })
  @IsString({ message: 'Должно быть строкой' })
  readonly first_name: string;

  @ApiProperty({ example: 'Петрович', description: 'отчество' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly patronymic?: string;

  @ApiProperty({ example: 'Петров', description: 'фамилия' })
  @IsString({ message: 'Должно быть строкой' })
  readonly last_name: string;

  @ApiProperty({
    example: '/photos/Image-bcd5.jpg',
    description: 'url, по которому можно получить фото',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly photo_url?: string;

  @ApiProperty({
    example: 'Немного о себе....',
    description: 'О себе',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly about_yourself?: string;

  @ApiProperty({
    example: 'male',
    description: 'Пол (male / female)',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly gender: string;

  @ApiProperty({
    example: '123-234-23',
    description: 'Студенческий билет',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly student_card?: string;

  @ApiProperty({
    example: 1,
    description: 'Id университета',
  })
  @IsOptional()
  @IsNumber(undefined, { message: 'Должно быть числом' })
  readonly university_id?: number;
}
