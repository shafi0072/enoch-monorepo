import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import {
//   graphqlUploadExpress
// } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
  // app.use(graphqlUploadExpress({ maxFileSize: 10 * 1000 * 1000 }));

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'files',
        brokers: [configService.get('KAFKA_URI')],
      },
      consumer: {
        groupId: 'file-service-group',
      },
    },
  });

  await app.startAllMicroservices();
  app.setGlobalPrefix(configService.get('PREFIX') || '');

  const config = new DocumentBuilder()
    .setTitle('File Service')
    .setDescription('The file API description')
    .setVersion('1.0')
    .addTag('files')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(+configService.get('PORT') || 3003);
}
bootstrap();
