import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import resolvers from './graphql/resolvers';
import { schemas } from './db/schemas';
import { services } from './services';
import { AppController } from './app.controller';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],

      useFactory: async (configService: ConfigService) => ({
        transport: {
          secure: false,
          service: configService.get('EMAIL_SERVICE'),
          auth: {
            user: configService.get('EMAIL'),
            pass: configService.get('EMAIL_PASS'),
          },
        },
        defaults: {
          from: configService.get('EMAIL_FROM'),
        },
        template: {
          dir: join(__dirname, '/mail/templates'),
          adapter: new HandlebarsAdapter(undefined, {
            inlineCssEnabled: false,
            inlineCssOptions: {
              url: ' ',
              preserveMediaQueries: true,
            },
          }),
          options: {
            strict: true,
          },
        },
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

  ],
  controllers: [AppController],
  providers: [
    ...resolvers,
    ...services,
  ],
})
export class AppModule {}
