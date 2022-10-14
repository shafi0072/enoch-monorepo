import axios from 'axios';
import { getCustomRepository } from 'typeorm';
import {
  BitcoinRepository,
  EthereumRepository,
  MaticRepository,
  TetherRepository,
  UsdCoinRepository,
  WBitcoinRepository,
  WMaticRepository,
  DaiRepository,
} from '../repository/Prices';
import logger from './log';

class CreateSchedulerService {
  private static instance: CreateSchedulerService;

  constructor() {
    if (CreateSchedulerService.instance instanceof CreateSchedulerService) {
      return CreateSchedulerService.instance;
    }
    CreateSchedulerService.instance = this;
  }

  public async execute(): Promise<void> {
    const cryptoCurrency: string[] = [
      'btc',
      'eth',
      'matic',
      'usdc',
      'dai',
      'usdt'
    ];

    for (let index = 0; index < cryptoCurrency.length; index++) {
      await this.medianizedPrice(cryptoCurrency[index]);
    }
  }

  private async medianizedPrice(reqBase: string) : Promise<void> {
    let prices = [];
    let estimatedPrice: number = 0;
    try {
      let response = await axios.get(`${process.env.SERVER_URL}/price/coinbase?base=${reqBase}`);
      prices.push(Number(response.data.price));
      response = await axios.get(`${process.env.SERVER_URL}/price/coingecko?base=${reqBase}`);
      prices.push(Number(response.data.price));
      response = await axios.get(`${process.env.SERVER_URL}/price/kraken?base=${reqBase}`);
      prices.push(Number(response.data.price));
      response = await axios.get(`${process.env.SERVER_URL}/price/coincap?base=${reqBase}`);
      prices.push(Number(response.data.price));
      response = await axios.get(`${process.env.SERVER_URL}/price/gemini?base=${reqBase}`);
      prices.push(Number(response.data.price));
  
      prices = prices.sort();
      estimatedPrice = Number(prices[parseInt(`${prices.length / 2}`)].toFixed(6));
      await this.addPrice({
        crypto: reqBase,
        fiat: 'usd',
        medianizedPrice: estimatedPrice,
        sources: prices.length,
      });
    } catch (error) {
      logger.error('CreateSchedulerService: Unable to store the price. ', error);
    }
  }

  private async addPrice(response: any): Promise<void> {
    let repo: any;
    let cryptoCurrency: any;

    switch (response.crypto) {
      case 'btc':
        repo = getCustomRepository(BitcoinRepository);
        cryptoCurrency = repo.create(response);
        await repo.save(cryptoCurrency);
        break;
      case 'eth':
        repo = getCustomRepository(EthereumRepository);
        cryptoCurrency = repo.create(response);
        await repo.save(cryptoCurrency);
        break;
      case 'matic':
        repo = getCustomRepository(MaticRepository);
        cryptoCurrency = repo.create(response);
        await repo.save(cryptoCurrency);
        break;
      case 'wbtc':
        repo = getCustomRepository(WBitcoinRepository);
        cryptoCurrency = repo.create(response);
        await repo.save(cryptoCurrency);
        break;
      case 'wmatic':
        repo = getCustomRepository(WMaticRepository);
        cryptoCurrency = repo.create(response);
        await repo.save(cryptoCurrency);
        break;
      case 'usdt':
        repo = getCustomRepository(TetherRepository);
        cryptoCurrency = repo.create(response);
        await repo.save(cryptoCurrency);
        break;
      case 'usdc':
        repo = getCustomRepository(UsdCoinRepository);
        cryptoCurrency = repo.create(response);
        await repo.save(cryptoCurrency);
        break;
      case 'dai':
        repo = getCustomRepository(DaiRepository);
        cryptoCurrency = repo.create(response);
        await repo.save(cryptoCurrency);
        break;
    }
  }
}

export default CreateSchedulerService;
