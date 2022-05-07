import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTeamDto } from './create-team.dto';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  @ApiProperty({ example: '1', description: 'id команды' })
  _id: number;

  @ApiProperty({ example: '1', description: 'Название команды' })
  title: string;

  @ApiProperty({ example: '1', description: 'Описание команды' })
  description: string;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор капитана команды',
  })
  captain_id: string;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор дисциплины (игры) команды',
  })
  game_id: number;

  @ApiProperty({ example: '1', description: 'Тип команды' })
  team_type: string;

  @ApiProperty({ example: '1', description: 'Количество участников команды' })
  members_count: number;

  @ApiProperty({ example: '1', description: 'URL заглавного фото команды' })
  logo_url: string;
}
