import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';

export class SignUpRes {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  user: User;
}
