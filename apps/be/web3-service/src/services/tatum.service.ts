import { Injectable, RequestMapping } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const axios = require('axios').default;
import { Currency } from '@tatumio/tatum';
import { TatumEndPoints } from 'src/constants/TatumEndpoints';
@Injectable()
export default class TatumService {
  constructor(private readonly configService: ConfigService) {}

  makeGetRequest = async (url: string, data: any, headers: any) => {
    return new Promise(async (resolve, reject) => {
      let requestData = { params: data, headers: headers };

      return axios
        .get(url, {
          params: data,
          headers: { 'x-api-key': this.configService.get('TATUM_API_KEY') },
        })
        .then((result) => {
          return resolve(result.data);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  };

  makePostRequest = async (
    methodType: string,
    url: string,
    data: any,
    headers: any,
  ) => {
    return new Promise(async (resolve, reject) => {
      return axios({
        method: methodType,
        url: url,
        data: data,
        headers: headers,
      })
        .then((result) => {
          return resolve(result.data);
        })
        .catch((err) => {
          return reject(err);
        });

      return axios
        .post(url, data, headers)
        .then((result) => {
          return resolve(result.data);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  };

  makeRequestData = async (method: string, url: string, data: any) => {
    let requestData = {
      method: method,
      url: url,
      params: '',
      body: '',
      headers: { 'x-api-key': this.configService.get('TATUM_API_KEY') },
    };
    if (method.toLowerCase() == 'get') {
      requestData.params = data;
    } else {
      requestData.body = data;
    }
    return requestData;
  };

  getCurrency = async (chain: any) => {
    switch (chain) {
      case 'ETH':
        return Currency.ETH;
      case 'MATIC':
        return Currency.MATIC;
      default:
        return undefined;
    }
  };

  getSubscriptionType = (type: number) => {
    switch (type) {
      case 1:
        return 'ADDRESS_TRANSACTION';
      case 2:
        return 'KMS_COMPLETED_TX';
      case 3:
        return 'KMS_FAILED_TX';
      default:
        return undefined;
    }
  };

  getSubscriptionData = (type: number, req: any) => {
    switch (type) {
      case 1:
        return {
          type: 'ADDRESS_TRANSACTION',
          attr: { address: req.address, chain: req.chain, url: req.url },
        };
      case 2:
        return { type: 'KMS_COMPLETED_TX', attr: { url: req.url } };
      case 3:
        return { type: 'KMS_FAILED_TX', attr: { url: req.url } };
      default:
        return undefined;
    }
  };

  getPendingTxType = (type: any) => {
    switch (type) {
      case 1:
        return 'NFT_DEPLOYMENT';
      case 2:
        return 'CREATE_GAS_PUMP_WALLET_BATCH';
      default:
        return undefined;
    }
  };

  PendingTransactionStatusTypes = {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED',
  };
}
