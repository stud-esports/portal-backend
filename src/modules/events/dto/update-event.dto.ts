import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @ApiProperty({ example: 'Турнир', description: 'Название события' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  title?: string;

  @ApiProperty({ example: 'Описание турнира', description: 'Описание события' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  description?: string;

  @ApiProperty({
    example: '2021-05-12T06:57:24.059Z',
    description: 'Дата и время начала события',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  start?: string;

  @ApiProperty({
    example: '2021-05-12T06:57:24.059Z',
    description: 'Дата и время конца события',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  end?: string;

  @ApiProperty({
    example: 'Московский политех',
    description: 'Место проведения',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  location?: string;

  @ApiProperty({ example: '/folder/image.png', description: 'URL фото' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  main_image_url?: string;

  @ApiProperty({ example: 1, description: 'id пользователя' })
  @IsOptional()
  @IsNumber(undefined, { message: 'Должно быть числом' })
  user_id?: number;

  @ApiProperty({ example: 1, description: 'id привязанного университета' })
  @IsOptional()
  @IsNumber(undefined, { message: 'Должно быть числом' })
  university_id?: number;

  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор дисциплины (игры)',
  })
  @IsOptional()
  @IsNumber(undefined, { message: 'Должно быть числом' })
  game_id?: number;
}
