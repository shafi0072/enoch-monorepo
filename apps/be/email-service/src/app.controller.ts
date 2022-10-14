import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ClientKafka,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';
import { AppService } from './app.service';
import { EmailService } from './services/email.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('KAFKA_SERVICE') private natsServerClient: ClientKafka,
    private jwtService: JwtService,
    private emailService: EmailService,
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

  @MessagePattern('sum')
  accumulate(data: number[], options): number {
    console.log('Command Executed', JSON.stringify(data));
    return (data || []).reduce((a, b) => a + b);
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
