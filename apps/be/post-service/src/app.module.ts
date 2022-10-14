import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module, Logger } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { join } from 'path';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import resolvers from './graphql/resolvers';
import { schemas } from './db/schemas';
import { services } from './services';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { controllers } from './controller';
import { RedisModule } from './redis/redis.module';


@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    RedisModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('RedisModule');
        return {
          connectionOptions: {
            host: configService.get('REDIS_CACHE_CONNECTION_HOST'),
            port: configService.get('REDIS_CACHE_CONNECTION_PORT'),
          },
          onClientReady: (client) => {
            logger.log('Redis client ready');
            client.on('error', (err) => {
              logger.error('Redis Client Error: ', err);
            });
            client.on('connect', () => {
              logger.log(
                `Connected to redis on ${client.options.host}:${client.options.port}`,
              );
            });
          },
        };
      },
      inject: [ConfigService],
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        name: 'REDIS-CACHE',
        store: redisStore,
        host: configService.get('REDIS_CACHE_CONNECTION_HOST'),
        port: configService.get('REDIS_CACHE_CONNECTION_PORT'),
      }),
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync([
      {
        name: 'REDIS-GRAPHQL',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          name: 'REDIS-GRAPHQL',
          transport: Transport.REDIS,
          options: {
            url: configService.get('REDIS_GRAPHQL_CONNECTION_URL'),
          },
        }),
        inject: [ConfigService],
      },
    ]),

    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          name: 'KAFKA_SERVICE',
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'post-service',
              brokers: [configService.get('KAFKA_URI')],
            },
            consumer: {
              groupId: 'post-service-group',
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        // console.log('MONGO_CONNECTION_URI', configService.get('MONGO_CONNECTION_URI'));
        return {
          uri: configService.get('MONGO_CONNECTION_URI'),
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature(schemas),
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
    PassportModule.register({ defaultStrategy: 'jwt' }),

  ],
  controllers: [AppController, ...controllers],
  providers: [
    AppService,
    ...resolvers,
    ...services,
    JwtStrategy,
    LocalStrategy,
  ],
})
export class AppModule {}
