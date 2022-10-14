import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
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
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import resolvers from '../src/graphql/resolvers';
import { schemas } from '../src/db/schemas';
import { services } from '../src/services';
import { JwtStrategy } from '../src/strategies/jwt.strategy';
import { LocalStrategy } from '../src/strategies/local.strategy';
import { controllers } from '../src/controller';
import { RedisModule } from '../src/redis/redis.module';

const moduleJson = {
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.test.env',
    }),
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
        name: 'NATS-SERVER-CLIENT',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          name: 'NATS-SERVER-CLIENT',
          transport: Transport.NATS,
          options: {
            servers: [configService.get('NATS_CONNECTION_URL')],
            queue: 'cats_queue',
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
        const uri = configService.get('MONGO_CONNECTION_URI');
        return {
          uri,
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
};

export const testModuleRef = Test.createTestingModule(moduleJson);
