import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber } from 'class-validator';

export class CreateTeamMemberDto {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор дисциплины (игры) команды',
  })
  @IsNumber(undefined, { message: 'Должно быть числом' })
  team_id: number;

  @ApiProperty({ example: 1, description: 'id привязанного университета' })
  @IsNumber(undefined, { message: 'Должно быть числом' })
  user_id: number;

  @ApiProperty({
    example: '2021-05-12T06:57:24.059Z',
    description: 'Дата вступления в команду',
  })
  @IsDate({ message: 'Должно быть датой' })
  joined_at: Date;
}
