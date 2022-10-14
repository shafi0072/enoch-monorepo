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

export const coinbase = () =>  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const reqBase: string = `${req.query.base}`;
  const base = (<any>ECoinbaseBase)[reqBase];
  try {
    const response = await axios.get(`https://api.coinbase.com/v2/prices/${base}-USD/buy`, {
      headers: { Authorization: `Bearer ${process.env.COINBASE_JWT}` },
    });
    const reponseData = response.data.data;

    res.status(201).json({
      source: 'coinbase',
      base: reponseData.base.toUpperCase(),
      currency: reponseData.currency,
      price: reponseData.amount,
    });
  } catch (error) {
    next(error);
  }
};

const router = Router();
export const coinbaseFeed = (): Router =>
  router.get(
    '/coinbase',
    handleError(coinbase()),
  );
