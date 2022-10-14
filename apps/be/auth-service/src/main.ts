import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: configService.get('REDIS_GRAPHQL_CONNECTION_URL'),
    },
  });

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'auth',
        brokers: [configService.get('KAFKA_URI')],
      },
      consumer: {
        groupId: 'auth-service-group',
      },
    },
  });

  await app.startAllMicroservices();
  app.setGlobalPrefix(configService.get('PREFIX') || '');
  const PORT = +configService.get('PORT') || 3001;
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  await app.listen(PORT);
}
bootstrap();
