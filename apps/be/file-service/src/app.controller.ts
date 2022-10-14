import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
  ClientKafka,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('KAFKA_SERVICE') private natsServerClient: ClientKafka,
    private jwtService: JwtService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  async login(@Body() body) {
    const { token } = body;
    const payload = this.jwtService.verify(token);
    return payload;
  }

  @Get('/m2')
  getM2() {
    return 'M@';
  }

  @EventPattern('user_created')
  userCreated(data: Record<string, unknown>): number {
    console.log('user created!');
    console.log(data);
    return 10;
  }

  async onApplicationBootstrap() {
    await this.natsServerClient.connect();
  }
}
