import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUniversityDto } from './create-university.dto';

export class UpdateUniversityDto extends PartialType(CreateUniversityDto) {
  @ApiProperty({
    example: 'Московский Политех',
    description: 'Название университета',
  })
  title: string;

  @ApiProperty({
    example: 'Московский Политех',
    description: 'Аббревиатура',
  })
  short_title: string;

  @ApiProperty({
    example: 'Большая Семеновская',
    description: 'Расположение университета',
  })
  location: string;

  @ApiProperty({ example: 'moscowpolytech@mail.ru', description: 'e-mail' })
  email: string;

  @ApiProperty({ example: '+79999999999', description: 'Номер' })
  number: string;

  @ApiProperty({
    example: 'moscowpolytech@mail.ru',
    description: 'Сайт университета',
  })
  link: string;
}
