import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import NftService from 'src/services/nft.service';
import { LikeNftDtoGql } from '../dto/like-nft.dto';
import { LikeNft } from '../models/like.nft.model';
import { Nft } from '../models/nft.model';

@Resolver(() => Nft)
export class NftResolver {
  constructor(private readonly nftService: NftService) {}

  @Mutation(() => LikeNft)
  likeNft(@Args('likeNftInput') input: LikeNftDtoGql) {
    return this.nftService.likeNft({
      userId: input.userId,
      nftId: input.nftId,
      isLiked: input.isLiked,
    });
  }
}
