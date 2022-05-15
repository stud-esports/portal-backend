import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({ example: '1', description: 'Название новости' })
  title: string;

  @ApiProperty({ example: '1', description: 'Описание новости' })
  description: string;

  @ApiProperty({ example: '1', description: 'Заглавное фото новости' })
  main_image_url: string;
}
