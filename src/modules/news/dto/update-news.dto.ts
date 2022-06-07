import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateNewsDto } from './create-news.dto';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
  @ApiProperty({ example: '1', description: 'id новости' })
  _id: number;
  
  @ApiProperty({ example: '1', description: 'Название новости' })
  title: string;

  @ApiProperty({ example: '1', description: 'Описание новости' })
  description: string;

  @ApiProperty({ example: '1', description: 'Заглавное фото новости' })
  main_image_url: string;

  @ApiProperty({ example: '1', description: 'Университет' })
  university_id: number;
}
