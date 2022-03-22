import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateContactDto } from './create-contact.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {
  @ApiProperty({ example: '1', description: 'id пользователя' })
  userId: number;

  @ApiProperty({ example: '1', description: 'Должность пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  position: string;

  @ApiProperty({
    example: '1',
    description: 'Вопросы, по которым можно обратиться',
  })
  @IsString({ message: 'Должно быть строкой' })
  questions: string;
}
