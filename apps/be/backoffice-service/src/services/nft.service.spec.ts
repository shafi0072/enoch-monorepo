import { testModuleRef } from '../../test/utils';
import NftService from './nft.service';
import { CreateNftDtoGql } from '../graphql/dto/create-nft.dto';

describe('NftService', () => {
  let nftService: NftService;

  beforeEach(async () => {
    const moduleRef = await testModuleRef.compile();
    nftService = moduleRef.get(NftService);
  });

  it('should be defined', () => {
    expect(nftService).toBeDefined();
  });

  describe('createNFT', () => {
    it('should create NFT', async () => {
      let input: CreateNftDtoGql = {
        name: 'test_nft',
        description: 'test purpose',
        image:"www.google.com",
        supply: "100",
        externalLinks: ["link1"],
        tags:["t1"],
        properties:{
          nftType:"t1",
          sex:"male",
          race:"r1"
        },
        collectionId:"5e4bb5c01c9d4400001fad23"
      };

      const testCategory = await nftService.createNft(input);
      expect(testCategory).toBeDefined();
      expect(testCategory.name).toBe('test_nft');
      expect(testCategory.description).toBe('test purpose');
    });
  });

  describe('getAllNFTs', () => {
    it('should return subcategories for given categoryId', async () => {
      const testCategory = await nftService.findAll({});
      expect(testCategory).toBeDefined();
      expect(testCategory).toBeInstanceOf(Array);
      expect(testCategory[0].name).toBe('test_nft');
      expect(testCategory[0].description).toBe('test purpose');
    });
  });

});
