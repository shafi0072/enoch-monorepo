import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { seeders, seederSchemas } from './seeder/index';

seeder({
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
    MongooseModule.forFeature(seederSchemas),
  ],
}).run(seeders);
