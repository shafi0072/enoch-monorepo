import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import AWS from 'aws-sdk';
import { S3Module } from 'nestjs-s3';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Controllers from './controllers';
import { schemas } from './db/schemas';
import resolvers from './graphql/resolvers';
import { allServices } from './services';
import { JwtStrategy } from './stratagies/jwt.strategy';

const graphqlPath = process.env.PREFIX
  ? `/${process.env.PREFIX || ''}/graphql`
  : '/graphql';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          name: 'KAFKA_SERVICE',
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'file-service',
              brokers: [configService.get('KAFKA_URI')],
            },
            consumer: {
              groupId: 'file-service-group',
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
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_CONNECTION_URI'),
      }),
      inject: [ConfigService],
    }),
    S3Module.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        config: {
          credentials: {
            signatureVersion: 'v4',
            accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
          },
          endpoint: new AWS.Endpoint(configService.get('DO_SPACES_ENDPOINT')),
        },
      }),
      inject: [ConfigService],
    }),

    MongooseModule.forFeature(schemas),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      path: graphqlPath,
      introspection: true,
      playground: true,
      debug: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: `/${process.env.PREFIX || ''}`,
    }),
  ],
  controllers: [AppController, ...Controllers],
  providers: [AppService, ...resolvers, ...allServices, JwtStrategy],
})
export class AppModule {}
