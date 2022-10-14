import { NextFunction, Request, Response, Router } from 'express';
import axios from 'axios';
import { getCustomRepository, MoreThan } from 'typeorm';
import { handleError, authenticate } from '../../middleware';
import {
  BitcoinRepository,
  EthereumRepository,
  MaticRepository,
  TetherRepository,
  UsdCoinRepository,
  WBitcoinRepository,
  WMaticRepository,
  DaiRepository,
} from '../../repository/Prices';
import { percentage } from '../../lib/percentage';

export const priceMedian = () => async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const reqBase: string = `${req.query.base}`;
  const minutesAgo: number = Number(req.query.minutes || 0);
  const authHeader = `${req.headers.authorization}`;
  let prices = [];
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
    const estimatedPrice = Number(prices[parseInt(`${prices.length / 2}`)].toFixed(6));

    const pricePercentChange = await priceAdd(reqBase, estimatedPrice, prices.length, minutesAgo);

    res.status(201).json({
      base: reqBase.toUpperCase(),
      currency: 'USD',
      price: estimatedPrice,
      sources: prices.length,
      percentChange: pricePercentChange,
      minutes: minutesAgo
    });
  } catch (error) {
    next(error);
  }
};

const router = Router();
export const priceMedianFeed = (): Router =>
  router.get('/price-median', authenticate, handleError(priceMedian()));

const priceAdd = async (
  base: string,
  estimatedPrice: number,
  totalPrices: number,
  minutesAgo: number,
): Promise<Number> => {
  let repo: any;
  let cryptoCurrency: any;
  const response = {
    crypto: base,
    fiat: 'usd',
    medianizedPrice: estimatedPrice,
    sources: totalPrices,
  };

  let pricePercentChange: Number = 0;

  switch (base) {
    case 'btc':
      repo = getCustomRepository(BitcoinRepository);
      cryptoCurrency = repo.create(response);
      await repo.save(cryptoCurrency);
      pricePercentChange = await priceChange(repo, estimatedPrice, minutesAgo);
      break;
    case 'eth':
      repo = getCustomRepository(EthereumRepository);
      cryptoCurrency = repo.create(response);
      await repo.save(cryptoCurrency);
      pricePercentChange = await priceChange(repo, estimatedPrice, minutesAgo);
      break;
    case 'matic':
      repo = getCustomRepository(MaticRepository);
      cryptoCurrency = repo.create(response);
      await repo.save(cryptoCurrency);
      pricePercentChange = await priceChange(repo, estimatedPrice, minutesAgo);
      break;
    case 'wbtc':
      repo = getCustomRepository(WBitcoinRepository);
      cryptoCurrency = repo.create(response);
      await repo.save(cryptoCurrency);
      pricePercentChange = await priceChange(repo, estimatedPrice, minutesAgo);
      break;
    case 'wmatic':
      repo = getCustomRepository(WMaticRepository);
      cryptoCurrency = repo.create(response);
      await repo.save(cryptoCurrency);
      pricePercentChange = await priceChange(repo, estimatedPrice, minutesAgo);
      break;
    case 'usdt':
      repo = getCustomRepository(TetherRepository);
      cryptoCurrency = repo.create(response);
      await repo.save(cryptoCurrency);
      pricePercentChange = await priceChange(repo, estimatedPrice, minutesAgo);
      break;
    case 'usdc':
      repo = getCustomRepository(UsdCoinRepository);
      cryptoCurrency = repo.create(response);
      await repo.save(cryptoCurrency);
      pricePercentChange = await priceChange(repo, estimatedPrice, minutesAgo);
      break;
    case 'dai':
      repo = getCustomRepository(DaiRepository);
      cryptoCurrency = repo.create(response);
      await repo.save(cryptoCurrency);
      pricePercentChange = await priceChange(repo, estimatedPrice, minutesAgo);
      break;
  }
  return pricePercentChange;
};

const priceChange = async (repo: any, estimatedPrice: number, minutesAgo: number): Promise<Number> => {
  const timeAgo = new Date(Date.now() - minutesAgo * 60000).toISOString();
  const priceData = await repo.findOne({
    where: {
      createdAt: MoreThan(timeAgo),
    },
  });
  const price = priceData.medianizedPrice;
  return percentage(estimatedPrice, price, 4);
};
