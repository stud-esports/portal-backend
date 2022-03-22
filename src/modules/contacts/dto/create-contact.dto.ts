import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ example: '1', description: 'id пользователя' })
  user_id: number;

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
