import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  readonly password: string;

  @ApiProperty({ example: 'Иван', description: 'имя' })
  @IsString({ message: 'Должно быть строкой' })
  readonly first_name: string;

  @ApiProperty({ example: 'Петрович', description: 'отчество' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly patronymic: string;

  @ApiProperty({ example: 'Петров', description: 'фамилия' })
  @IsString({ message: 'Должно быть строкой' })
  readonly last_name: string;

  @ApiProperty({
    example: '+7(999)9999999',
    description: 'Мобильный номер пользователя',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly phone: string;

  @ApiProperty({
    example: '/photos/Image-bcd5.jpg',
    description: 'url, по которому можно получить фото',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly photo_url: string;

  @ApiProperty({
    example: 'Sun, 01 May 2022 18:51:06 GMT',
    description: 'Дата и время начала блокровки',
  })
  readonly banned_from_date: string;

  @ApiProperty({
    example: 'Sun, 01 May 2022 18:51:06 GMT',
    description: 'Дата и время окончания блокировки',
  })
  readonly banned_to_date: string;
}
