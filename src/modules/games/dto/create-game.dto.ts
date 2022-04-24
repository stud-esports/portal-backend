import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty({ example: '1', description: 'Название дисциплины (игры)' })
  title: string;

  @ApiProperty({ example: '1', description: 'Описание дисциплины (игры)' })
  description: string;

  @ApiProperty({ example: '1', description: 'Жанр дисциплины (игры)' })
  genre: string;

  @ApiProperty({ example: '1', description: 'URL заглавного фото дисциплины (игры)' })
  main_image_url: string;
}
