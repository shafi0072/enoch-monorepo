import { Field, ID, ObjectType,  } from '@nestjs/graphql';
import { NftProperties } from './nftProperties.model';

@ObjectType()
export class Nft {
  @Field((type) => ID)
  _id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  image: string;

  @Field((type) => ID)
  collectionId: string;

  @Field()
  supply: string;
  
  @Field((type) => [String])
  externalLinks: string[];

  @Field((type) => [String])
  tags: string[];

  @Field((type) => NftProperties)
  properties: NftProperties;
  
  @Field()
  createdAt: Date;
}
