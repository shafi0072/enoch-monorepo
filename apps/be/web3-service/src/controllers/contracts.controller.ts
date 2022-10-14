import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateVirtualWalletDto } from 'src/shared/dto/virtualWallet.dto';
import { DeployNftCollection } from 'src/shared/dto/deployNftCollection.dto';
import { GetSignatureIdStatusDto } from 'src/shared/dto/getSignatureIdStatus.dto';
import { GetNftTransactionDetailsByHashDto } from 'src/shared/dto/nftTransactionDetailsByHash.dto';
import { CreateSubscriptionDto } from 'src/shared/dto/createSubscription.dto';
import { CancelSubscriptionDto } from 'src/shared/dto/cancelSubscription.dto';
import { HandleWebhookCallbackDto } from 'src/shared/dto/handleWebhookCallback.dto';
import VirtualWalletService from 'src/services/virtualWallet.service';
import DepositWalletService from 'src/services/depositWallet.service';
import GasPumpWalletService from 'src/services/gasPumpWallet.service';
import NftService from 'src/services/nft.service';
import TatumService from 'src/services/tatum.service';
import WebhookService from 'src/services/webhook.service';
import HandleWebhookCallbackService from 'src/services/webhookCallback.service';

@Controller('contract')
export class ContractController {
  constructor(
    private readonly nftService: NftService,
    private readonly tatumService: TatumService,
    private readonly webhookService: WebhookService,
    private readonly handleWebhookCallbackService: HandleWebhookCallbackService,
  ) {}

  @Post('deployNftCollection')
  deployNftCollection(@Body() deployNftCollection: DeployNftCollection) {
    return this.nftService.deployNftCollection(deployNftCollection);
  }

  @Get('getSignatureIdStatus')
  fetchVirtualAccounts(
    @Query() getSignatureIdStatusDto: GetSignatureIdStatusDto,
  ) {
    return this.nftService.getSignatureIdStatus(getSignatureIdStatusDto);
  }

  @Get('getNftTransactionDetailsByHash')
  getNftTransactionDetailsByHash(
    @Query()
    getNftTransactionDetailsByHashDto: GetNftTransactionDetailsByHashDto,
  ) {
    return this.nftService.getNftTransactionDetailsByHash(
      getNftTransactionDetailsByHashDto,
    );
  }

  @Post('createSubscription')
  createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.webhookService.createSubscription(createSubscriptionDto);
  }

  @Post('cancelSubscription')
  cancelSubscription(@Body() cancelSubscriptionDto: CancelSubscriptionDto) {
    return this.webhookService.cancelSubscription(cancelSubscriptionDto);
  }

  @Post('handleWebhookCallback')
  handleWebhookCallback(
    @Body() handleWebhookCallbackDto: HandleWebhookCallbackDto,
  ) {
    return this.handleWebhookCallbackService.handleWebhookCallback(
      handleWebhookCallbackDto,
    );
  }
}
