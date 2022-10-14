import { ConfigService } from '@nestjs/config';
import { Currency, generateDepositAddress, Address } from '@tatumio/tatum';
const axios = require('axios').default;
let configService: ConfigService;

export const getCurrency = async (chain: any) => {
  switch (chain) {
    case 'ETH':
      return Currency.ETH;
    case 'MATIC':
      return Currency.MATIC;
    default:
      return undefined;
  }
};
