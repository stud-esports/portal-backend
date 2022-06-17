import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsMobilePhone,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email?: string;

  @ApiProperty({ example: 'testLogin2208', description: 'Логин' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly login?: string;

  @ApiProperty({
    example: '+7(999)9999999',
    description: 'Мобильный номер пользователя',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  @IsMobilePhone('ru-RU', undefined, {
    message: 'Должно быть мобильным номером',
  })
  readonly phone?: string;

  @ApiProperty({
    example: new Date('2000-03-04'),
    description: 'Дата рождения пользователя',
  })
  @IsOptional()
  @IsDate({ message: 'Должно быть датой' })
  readonly birth_date?: Date;

  @ApiProperty({ example: '12345678', description: 'пароль' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  @Length(8, 16, { message: 'Не меньше 8 и не больше 16' })
  readonly password?: string;

  @ApiProperty({ example: 'Иван', description: 'имя' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly first_name?: string;

  @ApiProperty({ example: 'Петрович', description: 'отчество' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly patronymic?: string;

  @ApiProperty({ example: 'Петров', description: 'фамилия' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly last_name?: string;

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
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly gender?: string;

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

  @ApiProperty({
    example: 'active',
    description: 'Статус пользователя',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly status?: string;

  @ApiProperty({
    example: true,
    description: 'В сети',
  })
  @IsOptional()
  @IsBoolean({ message: 'Должно быть булевым значением' })
  readonly is_online?: boolean;

  @ApiProperty({
    example: '2021-05-12T06:57:24.059Z',
    description: 'Был в сети',
  })
  @IsOptional()
  readonly last_online?: Date;

  @ApiProperty({
    example: 'Ругается матом в комментариях',
    description: 'Причина блокировки',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly block_reason?: string;

  @ApiProperty({
    example: 'Sun, 01 May 2022 18:51:06 GMT',
    description: 'Дата и время начала блокровки',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly banned_from_date?: string;

  @ApiProperty({
    example: 'Sun, 01 May 2022 18:51:06 GMT',
    description: 'Дата и время окончания блокировки',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly banned_to_date?: string;

  @ApiProperty({
    example: 1,
    description: 'id привязанного к модератору университета',
  })
  @IsOptional()
  @IsNumber(undefined, { message: 'Должно быть числом' })
  readonly moderated_university_id?: number;
}
