import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import {
  ClientProxy,
  MessagePattern,
  ClientKafka,
} from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

import { AppService } from './app.service';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('KAFKA_SERVICE') private natsServerClient: ClientKafka,
    @Inject('REDIS-GRAPHQL') private redisClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  @Get('/test-api')
  testApi() {
    return 'Hello API';
  }

  @Get()
  getHello() {
    return 'Micro service is working!';
  }

  @Get('/cache/set')
  async setCache() {
    await this.cacheManager.set('name', 'enoch', { ttl: 10000 });
    return 'Cache set';
  }

  @Get('/cache/get')
  async getCache() {
    const value = await this.cacheManager.get(
      'followee.629f1bf245a29cf8436f1154',
    );
    return `Cached value: ${value}`;
  }

  @Get('/test-kafka')
  testkafka() {
    this.natsServerClient.emit('testing', { a: 'a', b: 'b' });
    return 'hello';
  }

  @Get('/check-message')
  getCheckMessage() {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    return this.natsServerClient.send<number>(pattern, payload);
  }

  @Get('/test-redis')
  testRedis() {
    const pattern = { cmd: 'notifications' };
    const payload = [1, 2, 3];
    // return 'asdf';
    // return this.natsServerClient.send<number>(pattern, payload);
    return this.redisClient.send<string>(pattern, payload);
  }

  @MessagePattern('notification')
  getNotifications() {
    console.log('Redis message cmd: redis triggered');
    return 'Message from redis microservice reply';
  }

  @Get('/send-email')
  async sendEmail() {
    let response;
    const pattern = { cmd: 'SEND_MAIL_WITH_PASSKEY' };
    const payload = {
      to: 'kaushik.bhadarka@elementzerolabs.com',
      passkey: 'afdsafads21412',
    };
    const mail: any = new Promise((resolve) => {
      this.natsServerClient
        .send<number>(pattern, payload)
        .subscribe((res) => resolve(res));
    });

    const mailSent = await mail;

    console.log('response', mailSent);
    return mail;
  }

  @Get('/emit-event')
  emitEvent() {
    console.log('Event Emitted');
    this.natsServerClient.emit<number>('user_created', {
      name: 'user_created',
      data: {
        name: 'Satish',
      },
    });
    return 'Event Emitted';
  }

  @Get('/login')
  login() {
    return this.jwtService.sign({ name: 'Satish' }, { expiresIn: 60 * 60 });
  }

  @Get('/m1')
  getM1() {
    return 'M1';
  }

  @Post('/verify')
  verify(@Body() body) {
    return this.jwtService.verify(body.token);
  }

  async onApplicationBootstrap() {
    await this.natsServerClient.connect();
    await this.redisClient.connect();
  }
}
