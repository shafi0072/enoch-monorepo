import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ClientKafka, ClientProxy } from "@nestjs/microservices";
import { JwtService } from "@nestjs/jwt";

@Controller()
export class AppController {
  constructor(
    @Inject("KAFKA_SERVICE") private natsServerClient: ClientKafka,
    private jwtService: JwtService
  ) {}

  @Get()
  getHello() {
    return "SMS micro-service is working!";
  }

  async onApplicationBootstrap() {
    await this.natsServerClient.connect();
  }
}
