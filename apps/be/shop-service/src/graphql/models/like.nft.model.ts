import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LikeNft {
  @Field()
  userId: string;

  @Field((type) => ID)
  nftId: string;

  @Field()
  isLiked: boolean;
}
