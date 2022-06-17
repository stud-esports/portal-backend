import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsMobilePhone } from 'class-validator';

export class CheckEmailDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;
}

export class CheckLoginDto {
  @ApiProperty({ example: 'testLogin2208', description: 'Логин' })
  @IsString({ message: 'Должно быть строкой' })
  readonly login: string;
}

export class CheckPhoneDto {
  @ApiProperty({
    example: '+7(999)9999999',
    description: 'Мобильный номер пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsMobilePhone('ru-RU', undefined, {
    message: 'Должно быть мобильным номером',
  })
  readonly phone: string;
}
