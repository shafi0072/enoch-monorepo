import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import ExtendedWalletService from 'src/services/extendedWallet.service';
import { CreateExtendedWalletDto } from 'src/shared/dto/extendedWallet.dto';
import { CreateVirtualWalletDto } from 'src/shared/dto/virtualWallet.dto';
import { CreateDepositWalletDto } from 'src/shared/dto/depositWallet.dto';
import { AssignDepositWalletDto } from 'src/shared/dto/assignDepositWallet.dto';
import { GetNftTransactionHistory } from 'src/shared/dto/nftTranscationHistory.dto';
import { GetNftBalance } from 'src/shared/dto/nftBalance.dto';
import { FetchVirtualAccounts } from 'src/shared/dto/fetchVirtualAccounts.dto';
import { FetchDepositAddressByAccountId } from 'src/shared/dto/fetchDepositAddressByAccountId.dto';
import { CreateGasPumpWalletBatch } from 'src/shared/dto/gasPumpWalletBatch.dto';
import { CreateGasPumpWalletBatchPrivateKey } from 'src/shared/dto/gasPumpWalletBatchPrivateKey.dto';
import { GetGasPumpWalletsFromTransactionHashDto } from 'src/shared/dto/getGasPumpWalletsFromTransactionHash.dto';
import VirtualWalletService from 'src/services/virtualWallet.service';
import DepositWalletService from 'src/services/depositWallet.service';
import GasPumpWalletService from 'src/services/gasPumpWallet.service';
import NftService from 'src/services/nft.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly extendedWalletService: ExtendedWalletService,
    private readonly virtualWalletService: VirtualWalletService,
    private readonly depositWalletService: DepositWalletService,
    private readonly nftService: NftService,
    private readonly gasPumpWalletService: GasPumpWalletService,
  ) {}

  @Post('generateExtendedPublicKey')
  generateExtendedWallet(
    @Body() createExtendedWalletDto: CreateExtendedWalletDto,
  ) {
    return this.extendedWalletService.generateExtendedPublicKey(
      createExtendedWalletDto,
    );
  }

  @Post('generateAdminVirtualAccount')
  generateAdminVirtualAccount(
    @Body() createVirtualWalletDto: CreateVirtualWalletDto,
  ) {
    return this.virtualWalletService.generateAdminVirtualWallet(
      createVirtualWalletDto,
    );
  }

  @Post('generateVirtualAccount')
  generateVirtualAccount(
    @Body() createVirtualWalletDto: CreateVirtualWalletDto,
  ) {
    return this.virtualWalletService.generateVirtualWallet(
      createVirtualWalletDto,
    );
  }

  @Post('generateDepositWallet')
  generateDepositWallet(
    @Body() createDepositWalletDto: CreateDepositWalletDto,
  ) {
    return this.depositWalletService.generateDepositWallet(
      createDepositWalletDto,
    );
  }

  @Post('assignDepositWallet')
  assignDepositWallet(@Body() assignDepositWalletDto: AssignDepositWalletDto) {
    return this.depositWalletService.assignDepositWallet(
      assignDepositWalletDto,
    );
  }

  @Get('getNftTransactionHistory')
  getNftTransactionHistory(
    @Query() getNftTransactionHistory: GetNftTransactionHistory,
  ) {
    return this.nftService.getNftTransactionHistory(getNftTransactionHistory);
  }

  @Get('getNftBalance')
  getNftBalance(@Query() getNftBalance: GetNftBalance) {
    return this.nftService.getNftBalance(getNftBalance);
  }

  @Get('fetchVirtualAccounts')
  fetchVirtualAccounts(@Query() fetchVirtualAccounts: FetchVirtualAccounts) {
    return this.virtualWalletService.fetchVirtualAccounts(fetchVirtualAccounts);
  }

  @Get('fetchDepositAddressByCustomerId')
  fetchDepositAddressByCustomerId(
    @Query() fetchDepositAddressByAccountId: FetchDepositAddressByAccountId,
  ) {
    return this.depositWalletService.fetchDepositAddressByAccountId(
      fetchDepositAddressByAccountId,
    );
  }

  @Post('createGasPumpWalletBatch')
  createGasPumpWalletBatch(
    @Body() createGasPumpWalletBatch: CreateGasPumpWalletBatch,
  ) {
    return this.gasPumpWalletService.createGasPumpWalletBatch(
      createGasPumpWalletBatch,
    );
  }

  @Post('createGasPumpWalletBatchByPrivateKey')
  createGasPumpWalletBatchByPrivateKey(
    @Body()
    createGasPumpWalletBatchPrivateKey: CreateGasPumpWalletBatchPrivateKey,
  ) {
    return this.gasPumpWalletService.createGasPumpWalletBatchByPrivateKey(
      createGasPumpWalletBatchPrivateKey,
    );
  }

  @Get('getGasPumpWalletsFromTransactionHash')
  getGasPumpWalletsFromTransactionHash(
    @Query()
    getGasPumpWalletsFromTransactionHashDto: GetGasPumpWalletsFromTransactionHashDto,
  ) {
    return this.gasPumpWalletService.getGasPumpWalletsFromTransactionHash(
      getGasPumpWalletsFromTransactionHashDto,
    );
  }
}
