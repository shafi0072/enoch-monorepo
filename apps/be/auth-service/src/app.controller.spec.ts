import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;
  beforeEach(async () => {
    const cacheManager = {} as Cache;
    const natsServerClient = {} as ClientProxy;
    const redisClient = {} as ClientProxy;
    const jwtService = {} as JwtService;

    appController = new AppController(
      cacheManager,
      natsServerClient,
      redisClient,
      jwtService,
    );
  });

  describe('testApi', () => {
    it('should return Hello API', async () => {
      const result = 'Hello API';
      expect(await appController.testApi()).toBe(result);
    });
  });
});
