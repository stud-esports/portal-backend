import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ example: '1', description: 'Название события' })
  title: string;

  @ApiProperty({ example: '1', description: 'Описание события' })
  description: string;

  @ApiProperty({ example: '1', description: 'Дата начала события' })
  start: string;

  @ApiProperty({ example: '1', description: 'Дата окончания события' })
  end: string;

  @ApiProperty({ example: '1', description: 'URL заглавного фото события' })
  main_image_url: string;

  @ApiProperty({ example: 'Московский политех', description: 'Место проведения' })
  location: string;
}
