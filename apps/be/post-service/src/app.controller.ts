import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientProxy,ClientKafka  } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';
import { Cache } from 'cache-manager';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('REDIS-GRAPHQL') private redisClient: ClientProxy,
    @Inject('KAFKA_SERVICE') private kafkaClient: ClientKafka,
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

  @Get('/m1')
  getM1() {
    return 'M1';
  }

  @Post('/verify')
  verify(@Body() body) {
    return this.jwtService.verify(body.token);
  }
  
  async onApplicationBootstrap() {
    await this.kafkaClient.connect();
    await this.redisClient.connect();
  }
}
