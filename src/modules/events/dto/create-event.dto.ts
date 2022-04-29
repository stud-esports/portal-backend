import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ example: '1', description: 'Название события' })
  title: string;

  @ApiProperty({ example: '1', description: 'Описание события' })
  description: string;

  @ApiProperty({ example: '1', description: 'Дата события' })
  date: string;

  @ApiProperty({ example: '1', description: 'URL заглавного фото события' })
  main_image_url: string;
}
