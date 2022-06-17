import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsOptional } from 'class-validator';

export class UpdateTeamMemberDto {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор команды',
  })
  @IsOptional()
  @IsNumber(undefined, { message: 'Должно быть числом' })
  team_id?: number;

  @ApiProperty({ example: 1, description: 'id пользователя' })
  @IsOptional()
  @IsNumber(undefined, { message: 'Должно быть числом' })
  user_id?: number;

  @ApiProperty({
    example: '2021-05-12T06:57:24.059Z',
    description: 'Дата вступления в команду',
  })
  @IsOptional()
  @IsDate({ message: 'Должно быть датой' })
  joined_at?: Date;

  @ApiProperty({
    example: '2021-05-12T06:57:24.059Z',
    description: 'Дата выхода из команды',
  })
  @IsOptional()
  @IsDate({ message: 'Должно быть датой' })
  left_at?: Date;

  @ApiProperty({
    example: '2021-05-12T06:57:24.059Z',
    description: 'Состоит в команде на данный момент',
  })
  @IsOptional()
  @IsBoolean({ message: 'Должно быть true/false' })
  is_active?: boolean;
}
