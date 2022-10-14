import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: "auth",
        brokers: [configService.get("KAFKA_URI")],
      },
      consumer: {
        groupId: "sms-service-group",
      },
    },
  });

  await app.startAllMicroservices();
  app.setGlobalPrefix(configService.get("PREFIX") || "");
  const PORT = +configService.get("PORT") || 3004;
  await app.listen(PORT);
}
bootstrap();
