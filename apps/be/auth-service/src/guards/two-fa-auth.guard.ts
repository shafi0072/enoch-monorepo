import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { ERROR_MESSAGES } from '../constant.json';
import UserService from 'src/services/user.service';

@Injectable()
export class TwoFAAuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.headers.authorization) {
      return false;
    }
    ctx.user = await this.validateToken(ctx.headers.authorization);
    if (!ctx.user) {
      throw new HttpException(
        ERROR_MESSAGES.TWO_FA_NOT_VERIFIED,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      return null;
    }
    const token = auth.split(' ')[1];
    try {
      const secret = this.configService.get('JWT_SECRET');
      const decodedToken: any = jwt.verify(token, secret);
      if (decodedToken.is2FAVerified === false) {
        return null;
      }

      return await this.userService.getUserByEmail(decodedToken.email);
    } catch (err) {
      return null;
    }
  }
}
