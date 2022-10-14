import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(() => {
    appService = new AppService();
  });

  describe('getHello', () => {
    it('should return Hello World!', async () => {
      const result = 'Hello World!';
      expect(await appService.getHello()).toBe(result);
    });
  });
});
