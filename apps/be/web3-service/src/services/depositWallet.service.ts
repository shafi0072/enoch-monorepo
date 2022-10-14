import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import {
  generateDepositAddress,
  assignDepositAddress,
  getDepositAddressesForAccount,
  Currency,
} from '@tatumio/tatum';
import {
  DepositWallet,
  DepositWalletDocument,
} from 'src/db/schemas/depositWallets.schema';
import DBService from './db.service';
import { EvmCompatibleCurrencies } from 'src/constants/SupportedCurrencies';
import VirtualWalletService from './virtualWallet.service';
import TatumService from './tatum.service';
import * as helpers from '../utils/helpers';

@Injectable()
export default class DepositWalletService extends DBService {
  constructor(
    @InjectModel(DepositWallet.name)
    private readonly depositWalletModel: Model<DepositWalletDocument>,
    private readonly virtualWalletService: VirtualWalletService,
    private readonly tatumService: TatumService,
    private readonly configService: ConfigService,
  ) {
    super(depositWalletModel);
  }

  async generateAndSaveDepositWallets(currency: Currency, userId: string) {
    return new Promise(async (resolve, reject) => {
      // check if virtual address exists for given currency and userId
      const existingWallets = await this.getDepositWalletCount({
        userId: userId,
        currency: currency,
      });

      if (!existingWallets) {
        if (EvmCompatibleCurrencies.includes(currency)) {
          let walletData = [];
          for (let i = 0; i < EvmCompatibleCurrencies.length; i++) {
            // fetch the given virtual address id and chain and create a deposit address from it
            let virtualAccount =
              await this.virtualWalletService.getVirtualWallets(
                { userId: userId, currency: EvmCompatibleCurrencies[i] },
                1,
                0,
              );
            if (virtualAccount.length > 0) {
              //  virtual account exist for this userid , so create the deposit address
              const id = virtualAccount[0].id;
              const address = await generateDepositAddress(id.toString());

              let newDepositWallet = Object.assign(
                {
                  type: virtualAccount[0].type,
                  id: id,
                  customerId: virtualAccount[0].customerId,
                  userId: userId,
                },
                address,
              );

              const newWallet = new this.depositWalletModel(newDepositWallet);
              walletData.push(newWallet);
            } else {
              //  no virtual address exists for this userId and currency , so return
              return reject('No Virtual account exist for this user and chain');
            }
          }
          await this.depositWalletModel.bulkSave(walletData);
          return resolve(walletData);
        } else {
          return reject('Blockchain not supported');
        }
      } else {
        // return that virtual addresses already exists for this user
        return reject(
          'Deposit address already exists for this chain and userId',
        );
      }
    });
  }

  async generateDepositWallet(req: any) {
    try {
      const chain = req.chain;
      const userId = req.userId;
      const currency = await this.tatumService.getCurrency(chain);
      if (!currency) {
        return { success: false, error: `${chain} blockchain not supported` };
      }

      return await this.generateAndSaveDepositWallets(chain, userId)
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

      await this.generateAndSaveDepositWallets(chain, userId)
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

  async getDepositWallets(query: any, limit: number, offset: number) {
    try {
      const result = await this.depositWalletModel
        .find(query)
        .limit(limit)
        .skip(offset);
      return result;
    } catch (err) {
      return err;
    }
  }

  async getDepositWalletCount(query: any) {
    try {
      const result = await this.depositWalletModel.countDocuments(query);
      return result;
    } catch (err) {
      return err;
    }
  }

  async attachMasterAddressToVirtualAccount(currency: any, userId: string) {
    return new Promise(async (resolve, reject) => {
      // check if virtual address exists for given currency and userId
      const userVirtualAccount =
        await this.virtualWalletService.getVirtualWallets(
          { userId: userId, currency: currency },
          1,
          0,
        );
      if (!userVirtualAccount || !userVirtualAccount.length) {
        return reject('No virtual wallet found for this user');
      }

      const id = userVirtualAccount[0].id;
      const address = await assignDepositAddress(
        id,
        this.configService.get('TATUM_ADMIN_WALLET'),
      ).catch((err) => {
        console.log('**@ address assigning error is , ', err);
      });
      console.log('**@ assigning address result is , ', address);

      return resolve(address);
    });
  }

  async assignDepositWallet(req: any) {
    try {
      const chain = req.chain;
      const userId = req.userId;
      const currency = await this.tatumService.getCurrency(chain);
      if (!currency) {
        return { success: false, error: `${chain} blockchain not supported` };
      }

      return await this.attachMasterAddressToVirtualAccount(chain, userId)
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

  async fetchDepositAddressByAccountId(req: any) {
    try {
      const accountId = req.accountId;

      return getDepositAddressesForAccount(accountId.toString())
        .then((result) => {
          const wallets = [];

          for (let i = 0; i < result.length; i++) {
            wallets.push({
              address: result[i].address,
              currency: result[i].currency,
            });
          }
          return {
            success: true,
            wallets: wallets,
          };
        })
        .catch((err) => {
          return { success: false, error: err };
        });
    } catch (err) {
      return { success: false, error: err };
    }
  }
}
