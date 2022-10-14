import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'email',
        brokers: [configService.get('KAFKA_URI')],
      },
      consumer: {
        groupId: 'email-service-group',
      },
    },
  });

  await app.startAllMicroservices();
  app.setGlobalPrefix(configService.get('PREFIX') || '');
  await app.listen(+configService.get('PORT') || 3002);
}
bootstrap();
