import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NftDtoGql {
  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  collectionId: string;

  @Field()
  type: string;

  @Field()
  nftContractAddress: string;

  @Field({ nullable: true })
  tokenId?: string;

  @Field({ nullable: true })
  tokenUrl?: string;

  @Field()
  token: string;

  @Field()
  owner: string;

  @Field()
  walletAddress: string;

  @Field()
  walletType: string;
}
