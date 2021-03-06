import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

export class SignInRes {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;

  @ApiProperty()
  user: User;
}
