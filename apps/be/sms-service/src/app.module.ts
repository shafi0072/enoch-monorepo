import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import resolvers from "./graphql/resolvers";
import { schemas } from "./db/schemas";
import { services } from "./services";
import { PassportModule } from "@nestjs/passport";
import { controllers } from "./controller";

const graphqlPath = process.env.PREFIX
  ? `/${process.env.PREFIX || ""}/graphql`
  : "/graphql";
@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: "KAFKA_SERVICE",
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          name: "KAFKA_SERVICE",
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: "sms-service",
              brokers: [configService.get("KAFKA_URI")],
            },

            consumer: {
              groupId: "sms-service-group",
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: { expiresIn: "60s" },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get("MONGO_CONNECTION_URI"),
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature(schemas),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      path: graphqlPath,
      playground: true,
      debug: true,
      introspection: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  controllers: [AppController, ...controllers],
  providers: [AppService, ...resolvers, ...services],
})
export class AppModule {}
