import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UsersService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { SignInDto } from './dto/sign-in.dto';
import { TokensService } from './tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokensService: TokensService,
  ) {}

  async generateTokens(user: User, fingerprint: string) {
    const refresh_token = await this.tokensService.generateRefreshToken(
      user,
      fingerprint,
    );
    const access_token = await this.tokensService.generateAccessToken(user);
    return { refresh_token, access_token, user };
  }

  async signIn(dto: SignInDto) {
    const user = await this.validateUser(dto);
    return await this.generateTokens(user, dto.fingerprint);
  }

  async signInAdmin(dto: SignInDto) {
    const user = await this.validateUserAdmin(dto);
    return await this.generateTokens(user, dto.fingerprint);
  }

  async signUp(userDto: CreateUserDto, fingerprint: string) {
    const user = await this.userService.createUser(userDto);

    return await this.generateTokens(user, fingerprint);
  }

  async refreshTokens(refreshToken: string, fingerprint: string) {
    return await this.tokensService.createTokensFromRefreshToken(
      refreshToken,
      fingerprint,
    );
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
    const isAdmin = this.userService.checkIsAdmin(user);

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
