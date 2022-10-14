import { Router } from 'express';

import {
  coinbaseFeed,
  coinapiFeed,
  coincapFeed,
  coingeckoFeed,
  cryptocompFeed,
  geminiFeed,
  krakenFeed,
  priceMedianFeed,
  averageFeed
} from '../controller/price';

const router = Router();

export default (): Router =>
  router.use([
    coinbaseFeed(),
    coinapiFeed(),
    coincapFeed(),
    coingeckoFeed(),
    cryptocompFeed(),
    geminiFeed(),
    krakenFeed(),
    priceMedianFeed(),
    averageFeed()
  ]);
