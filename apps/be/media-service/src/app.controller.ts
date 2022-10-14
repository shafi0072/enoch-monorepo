import { Controller, Get, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('KAFKA_SERVICE') private kafkaClient: ClientKafka,
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

  @EventPattern('testing')
  async testing({value}){
    console.log('value', value)
    return "hello"
  }

  

  async onApplicationBootstrap() {
    await this.kafkaClient.connect();
  }
}
