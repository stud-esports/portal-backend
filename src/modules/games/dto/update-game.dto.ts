import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGameDto } from './create-game.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateGameDto extends PartialType(CreateGameDto) {
  @ApiProperty({
    example: 'Contre Strike: Global Offensive',
    description: 'Название игры (дисциплины)',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  title?: string;

  @ApiProperty({ example: 'CS: GO', description: 'Короткое название' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  short_title?: string;

  @ApiProperty({
    example: 'Короткое описание...',
    description: 'Описание дисциплины (игры)',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  description?: string;

  @ApiProperty({ example: 'shooter', description: 'Жанр дисциплины (игры)' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  genre?: string;

  @ApiProperty({
    example: 'https://steam.com/game/cs-go',
    description: 'URL игры в магазине',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  store_url?: string;

  @ApiProperty({
    example: '/photos/Image-bcd5.jpg',
    description: 'URL фото игры',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  main_image_url?: string;

  @ApiProperty({
    example: '/photos/Image-bcd5.jpg',
    description: 'URL бэкграунда игры',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  background_image_url?: string;
}
