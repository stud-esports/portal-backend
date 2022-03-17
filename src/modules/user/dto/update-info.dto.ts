import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Иван', description: 'имя' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly first_name?: string;

  @ApiProperty({ example: 'Петрович', description: 'отчество' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly patronymic?: string;

  @ApiProperty({ example: 'Петров', description: 'фамилия' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly last_name?: string;
}
