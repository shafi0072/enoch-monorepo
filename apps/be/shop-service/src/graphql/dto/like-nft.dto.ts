import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class LikeNftDtoGql {
  @Field()
  userId: string;

  @Field((type) => ID)
  nftId: string;

  @Field()
  isLiked: boolean;
}
