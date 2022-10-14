import { EntityRepository } from 'typeorm';

import { BaseRepository } from './BaseRepository';
import { Prices } from '../model/Prices';
import { Bitcoin } from '../model/Bitcoin';
import { Dai } from '../model/Dai';
import { Ethereum } from '../model/Ethereum';
import { Matic } from '../model/Matic';
import { Tether } from '../model/Tether';
import { UsdCoin } from '../model/UsdCoin';
import { WBitcoin } from '../model/WBitcoin';
import { WMatic } from '../model/WMatic';

@EntityRepository(Prices)
export class PricesRepository extends BaseRepository<Prices> {}

@EntityRepository(Bitcoin)
export class BitcoinRepository extends BaseRepository<Bitcoin> {}

@EntityRepository(Ethereum)
export class EthereumRepository extends BaseRepository<Ethereum> {}

@EntityRepository(Matic)
export class MaticRepository extends BaseRepository<Matic> {}

@EntityRepository(WBitcoin)
export class WBitcoinRepository extends BaseRepository<WBitcoin> {}

@EntityRepository(WMatic)
export class WMaticRepository extends BaseRepository<WMatic> {}

@EntityRepository(Tether)
export class TetherRepository extends BaseRepository<Tether> {}

@EntityRepository(UsdCoin)
export class UsdCoinRepository extends BaseRepository<UsdCoin> {}

@EntityRepository(Dai)
export class DaiRepository extends BaseRepository<Dai> {}
