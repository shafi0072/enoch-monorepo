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
// import type { RedisClientOptions } from 'redis';
// import * as redisStore from 'cache-manager-redis-store';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { resolvers } from '../src/graphql/resolvers';
import { schemas } from '../src/db/schemas';
import { services } from '../src/services';
import { JwtStrategy } from '../src/stratagies/jwt-stratagy';

const moduleJson = {
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.test.env',
    }),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.get('JWT_SECRET'),
    //     signOptions: { expiresIn: '60s' },
    //   }),
    //   inject: [ConfigService],
    // }),
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
    // GraphQLModule.forRootAsync<ApolloDriverConfig>({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   driver: ApolloDriver,
    //   useFactory: async (configService: ConfigService) => {
    //     const graphqlPath = configService.get('PREFIX')
    //       ? `/${configService.get('PREFIX') || ''}/graphql`
    //       : '/graphql';
    //     return {
    //       autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //       path: graphqlPath,
    //       playground: true,
    //       debug: true,
    //       introspection: true,
    //       subscriptions: {
    //         'graphql-ws': true,
    //         'subscriptions-transport-ws': true,
    //       },
    //       context: ({ req }) => ({ headers: req.headers }),
    //     };
    //   },
    // }),
    // PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AppController],
  providers: [AppService, ...resolvers, ...services, JwtStrategy],
};

export const testModuleRef = Test.createTestingModule(moduleJson);
