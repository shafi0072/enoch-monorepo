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

export const gemini = () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const reqBase: string = `${req.query.base}`;
  const base = (<any>EGemini)[reqBase];
  try {
    const { data } = await axios.get(`https://api.gemini.com/v1/pubticker/${base}`, {
      // headers: { authorization: "Apikey {your_api_key}" },
    });

    res.status(201).json({
      source: 'gemini',
      base: reqBase.toUpperCase(),
      currency: 'USD',
      price: data.ask,
    });
  } catch (error) {
    next(error);
  }
};

const router = Router();
export const geminiFeed = (): Router =>
  router.get(
    '/gemini',
    handleError(gemini()),
  );
