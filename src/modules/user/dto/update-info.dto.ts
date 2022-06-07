import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
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
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly banned_from_date: string;

  @ApiProperty({
    example: 'Sun, 01 May 2022 18:51:06 GMT',
    description: 'Дата и время окончания блокировки',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly banned_to_date: string;

  @ApiProperty({
    example: '1',
    description: 'id привязанного к модератору университета',
  })
  moderated_university_id: number;
}
