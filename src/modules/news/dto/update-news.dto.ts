import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateNewsDto } from './create-news.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
  @ApiProperty({ example: 'Новости о турнире', description: 'Название' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  title?: string;

  @ApiProperty({
    example: 'Краткие итоги по турниру...',
    description: 'Описание',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  description?: string;

  @ApiProperty({ example: 'Много текста...', description: 'Основной текст' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  text?: string;

  @ApiProperty({
    example: '/photos/Image-bcd5.jpg',
    description: 'url основной картинки',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  main_image_url?: string;

  @ApiProperty({ example: 1, description: 'id университета' })
  @IsOptional()
  @IsNumber(undefined, { message: 'Должно быть числом' })
  university_id?: number;

  @ApiProperty({ example: 2, description: 'id автора' })
  @IsOptional()
  @IsNumber(undefined, { message: 'Должно быть числом' })
  user_id?: number;

  @ApiProperty({ example: 3, description: 'id события' })
  @IsOptional()
  @IsNumber(undefined, { message: 'Должно быть числом' })
  event_id?: number;
}
