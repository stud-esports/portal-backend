import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ example: 'NAVI', description: 'Название команды' })
  @IsString({ message: 'Должно быть строкой' })
  title: string;

  @ApiProperty({ example: '1', description: 'Описание команды' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  description?: string;

  @ApiProperty({ example: 1, description: 'Количество участников команды' })
  @IsNumber(undefined, { message: 'Должно быть числом' })
  members_count: number;

  @ApiProperty({
    example: '/photos/Image-bcd5.jpg',
    description: 'url, по которому можно получить лого',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  logo_url?: string;

  @ApiProperty({ example: 'standard', description: 'Тип команды' })
  @IsString({ message: 'Должно быть строкой' })
  team_type: string;

  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор капитана команды',
  })
  @IsNumber(undefined, { message: 'Должно быть числом' })
  captain_id: number;

  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор дисциплины (игры) команды',
  })
  @IsNumber(undefined, { message: 'Должно быть числом' })
  game_id: number;

  @ApiProperty({ example: 1, description: 'id привязанного университета' })
  @IsOptional()
  @IsNumber(undefined, { message: 'Должно быть числом' })
  university_id: number;
}
