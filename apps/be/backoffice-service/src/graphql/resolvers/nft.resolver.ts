import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import NftService from 'src/services/nft.service';
import { CreateNftDtoGql } from '../dto/create-nft.dto';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { Nft } from '../models/nft.model';
import { ListNfts } from '../dto/list-nft.dto';
@Resolver(() => Nft)
export class NftResolver {
  constructor(private readonly nftService: NftService) {}

  @Mutation(() => Nft)
  createNFT(
    @Args('createNftInput') input: CreateNftDtoGql,
  ) {

    return this.nftService.createNft({
      image: input.image,
      name: input.name,
      collectionId: input.collectionId,
      supply: input.supply,
      externalLinks: input.externalLinks,
      tags: input.tags,
      description: input.description,
      properties: input.properties
    });
  }

  @Query(() => Number, { name: 'countNfts' })
  getCount(): Promise<number> {
    return this.nftService.getCount()
  }

  @Query(() => [Nft])
  findAllNfts(@Args() args:ListNfts ) {
    return this.nftService.findAll(args);
  }

}
