export const TatumEndPoints = {
  getNftTransactionHistoryByAddressAndContractAddress: `/v3/nft/transaction/`,
  getNftBalanceByAddress: '/v3/nft/address/balance/',
  getNftBalanceByAddressAndContract: '/v3/nft/balance/',
  createGasPumpWalletBatch: '/v3/blockchain/sc/custodial/batch',
  createGasPumpWalletBatchPrivateKey: '/v3/blockchain/sc/custodial/batch',
  deployNftCollectionKms: '/v3/nft/deploy',
  getSignatureIdStatus: '/v3/kms/',
  getNftTransactionDetailsByHash: '/v3/nft/transaction/',
  getGasPumpWalletsFromTransactionHash: '/v3/blockchain/sc/custodial/',
  createSubscription: '/v3/subscription',
  cancelSubscription: '/v3/subscription/',
};
