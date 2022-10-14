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

export const coinapi = () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const reqBase: string = `${req.query.base}`;
  const base = (<any>EKrakenBase)[reqBase];
  try {
    const response = await axios.get(`https://rest.coinapi.io/v1/exchangerate/${base}/USD`, {
      headers: { 'X-CoinAPI-Key': `${process.env.COINAPI_KEY}` },
    });

    const responseData = response.data;

    res.status(201).json({
      source: 'coinapi.io',
      base: reqBase.toUpperCase(),
      currency: 'USD',
      price: responseData.rate,
    });
  } catch (error) {
    next(error);
  }
};

const router = Router();
export const coinapiFeed = (): Router =>
  router.get(
    '/coinapi',
    handleError(coinapi()),
  );
