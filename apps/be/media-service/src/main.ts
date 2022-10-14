import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'media',
        brokers: [configService.get('KAFKA_URI')],
      },
      consumer: {
        groupId: 'media-service-group',
      },
    },
  });
  await app.startAllMicroservices();
  app.setGlobalPrefix(configService.get('PREFIX') || '');
  const PORT = +configService.get('PORT') || 3007;
  await app.listen(PORT);
}
bootstrap();
