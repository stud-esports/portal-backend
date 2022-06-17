import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({ example: 'Новости о турнире', description: 'Название' })
  @IsString({ message: 'Должно быть строкой' })
  title: string;

  @ApiProperty({
    example: 'Краткие итоги по турниру...',
    description: 'Описание',
  })
  @IsString({ message: 'Должно быть строкой' })
  description: string;

  @ApiProperty({ example: 'Много текста...', description: 'Основной текст' })
  @IsString({ message: 'Должно быть строкой' })
  text: string;

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
  @IsNumber(undefined, { message: 'Должно быть числом' })
  user_id: number;

  @ApiProperty({ example: 3, description: 'id события' })
  @IsOptional()
  @IsNumber(undefined, { message: 'Должно быть числом' })
  event_id?: number;
}
