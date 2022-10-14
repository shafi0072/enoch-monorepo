import { Render } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AccessToken } from 'src/graphql/models/token.model';
import { AuthService } from 'src/services/auth.service';
import { LocalStrategy } from 'src/strategies/local.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalStrategy)
  @Post('sign-in')
  async signIn(@Req() req: Request): Promise<AccessToken> {
    const response = await this.authService.validate(
      req.body.email,
      req.body.password,
      true,
    );
    const token = await this.authService.createSimpleToken(
      response.email,
      response.userId,
      '1d',
    );
    return { accessToken: token.accessToken };
  }

  @Get('google-signin')
  @Render('index')
  root() {}
}
