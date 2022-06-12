import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UsersService } from '../user/user.service';
import { User } from '../user/models/user.model';
import { SignInDto } from './dto/sign-in.dto';
import { TokensService } from './tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokensService: TokensService,
  ) {}

  async generateTokens(user: User) {
    const refresh_token = await this.tokensService.generateRefreshToken(user);
    const access_token = await this.tokensService.generateAccessToken(user);
    return { refresh_token, access_token, user };
  }

  async signIn(userDto: SignInDto) {
    const user = await this.validateUser(userDto);
    return await this.generateTokens(user);
  }

  async signInAdmin(userDto: SignInDto) {
    const user = await this.validateUserAdmin(userDto);
    return await this.generateTokens(user);
  }

  async signUp(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userService.createUser(userDto);

    return await this.generateTokens(user);
  }

  async refreshTokens(refreshToken: string) {
    return await this.tokensService.createTokensFromRefreshToken(refreshToken);
  }

  async logout(refreshToken: string) {
    return await this.tokensService.deleteStoredRefreshToken(refreshToken);
  }

  private async validateUser(dto: SignInDto) {
    const user = await this.userService.getUserByEmail(dto.email, true);
    const passwordEquals = await this.userService.validateCredentials(
      dto.password,
      user,
    );

    if (!user || !passwordEquals) {
      throw new UnauthorizedException({
        message: 'Некорректный email или пароль',
      });
    }

    return await this.userService.getUserByEmail(dto.email);
  }

  private async validateUserAdmin(dto: SignInDto) {
    const user = await this.userService.getUserByEmail(dto.email, true);
    const passwordEquals = await this.userService.validateCredentials(
      dto.password,
      user,
    );
    const isAdmin = await this.userService.checkIsAdmin(user);

    if (!user || !passwordEquals) {
      throw new UnauthorizedException({
        message: 'Некорректный email или пароль',
      });
    }

    if (!isAdmin) {
      throw new UnauthorizedException({
        message: 'Пользователь не является администратором или модератором',
      });
    }

    if (user.banned_from_date && user.banned_to_date) {
      const date = new Date();
      const start = new Date(user.banned_from_date);
      const end = new Date(user.banned_to_date);

      if (date > start && date < end) {
        throw new UnauthorizedException({
          message: 'Аккаунт пользователя заблокирован',
        });
      }
    }

    return await this.userService.getUserByEmail(dto.email);
  }
}
