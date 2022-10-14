import { NextFunction, Request, Response, Router } from 'express';
import axios from 'axios';
import {
  ECoinbaseBase,
  ECoingeckoBase,
  EKrakenBase,
  ECoincapBase,
  EGemini,
} from '../../enums/base.enum';
import { handleError, authenticate } from '../../middleware';

export const coingecko = () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const reqBase: string = `${req.query.base}`;
  const base = (<any>ECoingeckoBase)[reqBase];
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${base}&vs_currencies=usd`,
      {
        headers: { accept: 'application/json' },
      },
    );

    res.status(201).json({
      source: 'coingecko',
      base: reqBase.toUpperCase(),
      currency: 'USD',
      price: response.data[base].usd,
    });
  } catch (error) {
    next(error);
  }
};

const router = Router();
export const coingeckoFeed = (): Router =>
  router.get(
    '/coingecko',
    handleError(coingecko()),
  );
