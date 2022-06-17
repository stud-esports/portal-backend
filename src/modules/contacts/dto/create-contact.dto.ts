import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    example: 'Старший преподаватель',
    description: 'Должность пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  position: string;

  @ApiProperty({
    example: 'Как попасть в сборную? Кто скрывается под маской Бэтмена?',
    description: 'Вопросы, по которым можно обратиться',
  })
  @IsString({ message: 'Должно быть строкой' })
  questions: string;

  @ApiProperty({ example: 1, description: 'id пользователя' })
  @IsNumber(undefined, { message: 'Должно быть числом' })
  user_id: number;

  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор университета',
  })
  @IsOptional()
  @IsNumber(undefined, { message: 'Должно быть числом' })
  university_id?: number;
}
