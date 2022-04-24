import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGameDto } from './create-game.dto';

export class UpdateGameDto extends PartialType(CreateGameDto) {
  @ApiProperty({ example: '1', description: 'id дисциплины (игры)' })
  _id: number;

  @ApiProperty({ example: '1', description: 'Название дисциплины (игры)' })
  title: string;

  @ApiProperty({ example: '1', description: 'Описание дисциплины (игры)' })
  description: string;

  @ApiProperty({ example: '1', description: 'Жанр дисциплины (игры)' })
  genre: string;

  @ApiProperty({
    example: '1',
    description: 'URL заглавного фото дисциплины (игры)',
  })
  main_image_url: string;
}
