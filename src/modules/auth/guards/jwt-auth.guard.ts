import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public-url.decorator';
import { UsersService } from '../../user/user.service';

export interface AccessTokenPayload {
  sub: number;
}
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );

      const req = context.switchToHttp().getRequest();

      const authHeader = req.headers.authorization;

      if (!authHeader) {
        if (isPublic) {
          return true;
        }
        throw new Error('No auth header found');
      }

      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        if (isPublic) {
          return true;
        }
        throw new Error('No access token');
      }

      const { sub } = this.jwtService.verify<AccessTokenPayload>(token);
      const user = await this.usersService.getUserById(Number(sub));

      if (!user) {
        if (isPublic) {
          return true;
        }
        throw new Error('No user found');
      }

      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({
        message: 'Auth error',
        details: e.message,
      });
    }
  }
}
