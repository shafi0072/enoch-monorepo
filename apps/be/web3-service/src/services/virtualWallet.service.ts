import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Currency, CreateAccount, createAccount } from '@tatumio/tatum';
import {
  VirtualWallet,
  VirtualWalletDocument,
} from 'src/db/schemas/virtualWallets.schema';
import DBService from './db.service';
import { EvmCompatibleCurrencies } from 'src/constants/SupportedCurrencies';
import ExtendedWalletService from './extendedWallet.service';
import TatumService from './tatum.service';
import * as helpers from '../utils/helpers';

@Injectable()
export default class VirtualWalletService extends DBService {
  constructor(
    @InjectModel(VirtualWallet.name)
    private readonly virtualWalletModel: Model<VirtualWalletDocument>,
    private readonly extendedWalletService: ExtendedWalletService,
    private readonly tatumService: TatumService,
  ) {
    super(virtualWalletModel);
  }

  async generateAndSaveVirtualWallets(
    currency: Currency,
    userId: string,
    type: string,
    includePublicKey: boolean,
  ) {
    return new Promise(async (resolve, reject) => {
      // check if virtual address exists for given currency and userId
      const existingWallets = await this.getVirtualWalletCount({
        userId: userId,
        currency: currency,
      });

      if (!existingWallets) {
        if (EvmCompatibleCurrencies.includes(currency)) {
          const walletData = [];
          for (let i = 0; i < EvmCompatibleCurrencies.length; i++) {
            let virtualWalletCount = await this.getVirtualWalletCount({
              type: type,
              currency: currency,
            });
            const extendedWalletCount =
              await this.extendedWalletService.getExtendedWalletCount({
                type: type,
                chain: EvmCompatibleCurrencies[i],
              });

            if (!extendedWalletCount) {
              return {
                success: false,
                error: 'No Extended wallet found for given currency',
              };
            }
            const extendedWalletIndex =
              virtualWalletCount % extendedWalletCount;

            const masterWallet =
              await this.extendedWalletService.getExtendedWallets(
                { type: type, chain: EvmCompatibleCurrencies[i] },
                1,
                extendedWalletIndex,
              );

            let createAccountData: CreateAccount;

            if (includePublicKey) {
              createAccountData = {
                currency: EvmCompatibleCurrencies[i],
                xpub: masterWallet[0].xpub,
                customer: {
                  externalId: userId,
                },
              };
            } else {
              //  generating virtual accounts without xpub
              createAccountData = {
                currency: EvmCompatibleCurrencies[i],
                customer: {
                  externalId: userId,
                },
              };
            }

            const account = await createAccount(createAccountData);
            let newVirtualWallet = Object.assign(
              {
                type: type,
                userId: userId,
                extendedWalletIndex: extendedWalletIndex,
              },
              account,
            );

            const newWallet = new this.virtualWalletModel(newVirtualWallet);
            walletData.push(newWallet);
          }

          await this.virtualWalletModel.bulkSave(walletData);
          return resolve(walletData);
        } else {
          return reject('Blockchain not supported');
        }
      } else {
        return reject(
          'Virtual address already exists for this chain and userId',
        );
      }
    });
  }

  async generateVirtualWallet(req: any) {
    try {
      const chain = req.chain;
      const userId = req.userId;
      const currency = await this.tatumService.getCurrency(chain);
      if (!currency) {
        return { success: false, error: `${chain} blockchain not supported` };
      }

      const type = 'user';

      return await this.generateAndSaveVirtualWallets(
        chain,
        userId,
        type,
        false,
      )
        .then((wallets) => {
          return { success: true, wallets: wallets };
        })
        .catch((err) => {
          return { success: false, error: err };
        });
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async generateAdminVirtualWallet(req: any) {
    try {
      const chain = req.chain;
      const userId = req.userId;
      const currency = await this.tatumService.getCurrency(chain);
      if (!currency) {
        return { success: false, error: `${chain} blockchain not supported` };
      }

      const type = 'admin';

      return await this.generateAndSaveVirtualWallets(chain, userId, type, true)
        .then((wallets) => {
          return { success: true, wallets: wallets };
        })
        .catch((err) => {
          return { success: false, error: err };
        });
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async fetchVirtualAccounts(req: any) {
    try {
      const userId = req.userId;
      const userLimit = req.limit ? req.limit : 10;
      const userOffset = req.offset ? req.offset : 0;
      return await this.getVirtualWallets(
        { userId: userId },
        userLimit,
        userOffset,
      )
        .then((wallets) => {
          return { success: true, wallets: wallets };
        })
        .catch((err) => {
          return { success: false, error: err };
        });
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getVirtualWallets(query: any, limit: number, offset: number) {
    try {
      const result = await this.virtualWalletModel
        .find(query)
        .limit(limit)
        .skip(offset);
      return result;
    } catch (err) {
      return err;
    }
  }

  async getVirtualWalletCount(query: any) {
    try {
      const result = await this.virtualWalletModel.countDocuments(query);
      return result;
    } catch (err) {
      return err;
    }
  }
}
