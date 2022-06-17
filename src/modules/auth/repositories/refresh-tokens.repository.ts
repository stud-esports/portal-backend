import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../user/entities/user.entity';
import { RefreshToken } from '../entities/refresh-token.entity';

@Injectable()
export class RefreshTokensRepository {
  constructor(
    @InjectModel(RefreshToken) private refreshTokens: typeof RefreshToken,
  ) {}

  public async create(
    user: User,
    token: string,
    fingerprint: string,
    ttl: Date,
  ): Promise<RefreshToken> {
    return this.refreshTokens.create({
      user_id: user._id,
      expires: ttl,
      token,
      fingerprint,
    });
  }

  public async findTokenById(id: number): Promise<RefreshToken | null> {
    return this.refreshTokens.findOne({
      where: {
        _id: id,
      },
    });
  }

  public async deleteById(id: number): Promise<number | null> {
    return this.refreshTokens.destroy({ where: { _id: id } });
  }
}
