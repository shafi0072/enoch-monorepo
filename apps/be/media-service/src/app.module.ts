import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from './app.service';
import { controllers } from './controllers';
import { services } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import { schemas } from './db/schemas';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import resolvers from './graphql/resolvers';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get('MONGO_CONNECTION_URI'),
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature(schemas),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),

    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          name: 'KAFKA_SERVICE',
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'media-service',
              brokers: [configService.get('KAFKA_URI')],
            },
            consumer: {
              groupId: 'media-service-group',
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => {
        const graphqlPath = configService.get('PREFIX')
          ? `/${configService.get('PREFIX') || ''}/graphql`
          : '/graphql';
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          path: graphqlPath,
          playground: true,
          debug: true,
          introspection: true,
          subscriptions: {
            'graphql-ws': true,
            'subscriptions-transport-ws': true,
          },
          context: ({ req }) => ({ headers: req.headers }),
        };
      },
    }),
  ],
  controllers: [...controllers],
  providers: [AppService, ...services, ...resolvers, JwtStrategy],
})
export class AppModule {}
