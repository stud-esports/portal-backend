import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';

import { User } from '../user/entities/user.entity';
import { UsersService } from '../user/user.service';
import { RefreshToken } from './entities/refresh-token.entity';

import { RefreshTokensRepository } from './repositories/refresh-tokens.repository';
import { getTimeForRefreshToken } from './utils/timeForTokens';

export interface RefreshTokenPayload {
  jti: number;
  sub: number;
}

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly refreshTokensRepository: RefreshTokensRepository,
  ) {}

  public async generateAccessToken(user: User): Promise<string> {
    const options: SignOptions = {
      subject: String(user._id),
      expiresIn: `${process.env.TTL_ACCESS_TOKEN_IN_MINUTES || 5}m`,
    };

    return await this.jwtService.signAsync({}, options);
  }

  public async generateRefreshToken(
    user: User,
    fingerprint: string,
  ): Promise<string> {
    const ttl = getTimeForRefreshToken();
    const options: SignOptions = {
      expiresIn: `${process.env.TTL_REFRESH_TOKEN_IN_DAYS || 10}d`,
      subject: String(user._id),
    };
    const token = await this.jwtService.signAsync({}, options);

    await this.refreshTokensRepository.create(user, token, fingerprint, ttl);

    return token;
  }

  public async resolveRefreshToken(
    refresh: string,
  ): Promise<{ user: User; token: RefreshToken }> {
    const payload = await this.decodeRefreshToken(refresh);
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload);

    if (!token) {
      throw new UnprocessableEntityException('Refresh token not found');
    }

    if (token.is_revoked) {
      throw new UnprocessableEntityException('Refresh token revoked');
    }

    const user = await this.getUserFromRefreshTokenPayload(payload);

    if (!user) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return { user, token };
  }

  public async deleteStoredRefreshToken(refresh: string) {
    const payload = await this.decodeRefreshToken(refresh);
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload);

    if (!token) {
      throw new UnprocessableEntityException('Refresh token not found');
    }

    return await this.refreshTokensRepository.deleteById(token._id);
  }

  public async createTokensFromRefreshToken(
    refresh: string,
    fingerprint: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const { user } = await this.resolveRefreshToken(refresh);

    const access_token = await this.generateAccessToken(user);

    const refresh_token = await this.generateRefreshToken(user, fingerprint);

    return { access_token, refresh_token };
  }

  public async decodeRefreshToken(token: string): Promise<RefreshTokenPayload> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired');
      } else {
        throw new UnprocessableEntityException(
          'Refresh token malformed or not found',
        );
      }
    }
  }

  private async getUserFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<User> {
    const subId = payload.sub;

    if (!subId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.usersService.getUserById(subId);
  }

  private async getStoredTokenFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<RefreshToken | null> {
    const tokenId = payload.jti;

    if (!tokenId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.refreshTokensRepository.findTokenById(tokenId);
  }
}
