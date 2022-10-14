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

export const kraken = () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const reqBase: string = `${req.query.base}`;
  const base = (<any>EKrakenBase)[reqBase];
  try {
    const response = await axios.get(`https://api.kraken.com/0/public/Ticker?pair=${base}USD`, {
      headers: { accept: 'application/json' },
    });

    const responseData: any = Object.values(response.data.result)[0];

    res.status(201).json({
      source: 'kraken',
      base: reqBase.toUpperCase(),
      currency: 'USD',
      price: responseData['a'][0],
    });
  } catch (error) {
    next(error);
  }
};

const router = Router();
export const krakenFeed = (): Router =>
  router.get(
    '/kraken',
    handleError(kraken()),
  );
