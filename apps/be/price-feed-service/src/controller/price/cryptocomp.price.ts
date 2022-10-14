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

export const cryptocomp = () => async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const reqBase: string = `${req.query.base}`;
  const base = (<any>EKrakenBase)[reqBase];
  try {
    const response = await axios.get(
      `https://min-api.cryptocompare.com/data/price?fsym=${base}&tsyms=USD`,
      {
        // headers: { authorization: "Apikey {your_api_key}" },
      },
    );
    const responseData = response.data;

    res.status(201).json({
      source: 'cryptocompare',
      base: reqBase.toUpperCase(),
      currency: 'USD',
      price: responseData.USD,
    });
  } catch (error) {
    next(error);
  }
};

const router = Router();
export const cryptocompFeed = (): Router =>
  router.get(
    '/cryptocomp',
    handleError(cryptocomp()),
  );
