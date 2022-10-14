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

export const coincap = () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const reqBase: string = `${req.query.base}`;
  const base = (<any>ECoincapBase)[reqBase];
  try {
    const response = await axios.get(`https://api.coincap.io/v2/assets/${base}`);

    const responseData = response.data.data;

    res.status(201).json({
      source: 'coincap',
      base: reqBase.toUpperCase(),
      currency: 'USD',
      price: responseData.priceUsd,
    });
  } catch (error) {
    next(error);
  }
};

const router = Router();
export const coincapFeed = (): Router =>
  router.get(
    '/coincap',
    handleError(coincap()),
  );
