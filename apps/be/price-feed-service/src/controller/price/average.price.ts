import { NextFunction, Request, Response, Router } from 'express';
import axios from 'axios';
import { getCustomRepository } from 'typeorm';
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

export const average = () => async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const reqBase: string = `${req.query.base}`;
  const repo = currency(reqBase);
  const prices = await repo.find();
  let sumPrice: number = 0;
  let priceLength: number = prices.length;
  for (let index = 0; index < priceLength; index++) {
    sumPrice += prices[index].medianizedPrice;
  }
  const averagePrice = sumPrice / priceLength;
  res.status(201).json({
    base: reqBase,
    datalength: prices.length,
    realisedPrice: averagePrice.toFixed(6),
  });
};

const router = Router();
export const averageFeed = (): Router => router.get('/average', authenticate, handleError(average()));

const currency = (base: string): any => {
  let repo: any;
  switch (base) {
    case 'btc':
      repo = getCustomRepository(BitcoinRepository);
      break;
    case 'eth':
      repo = getCustomRepository(EthereumRepository);
      break;
    case 'matic':
      repo = getCustomRepository(MaticRepository);
      break;
    case 'wbtc':
      repo = getCustomRepository(WBitcoinRepository);
      break;
    case 'wmatic':
      repo = getCustomRepository(WMaticRepository);
      break;
    case 'usdt':
      repo = getCustomRepository(TetherRepository);
      break;
    case 'usdc':
      repo = getCustomRepository(UsdCoinRepository);
      break;
    case 'dai':
      repo = getCustomRepository(DaiRepository);
      break;
  }
  return repo;
};


/**
 * % Change in 1hr, 24hr, 7days
 */