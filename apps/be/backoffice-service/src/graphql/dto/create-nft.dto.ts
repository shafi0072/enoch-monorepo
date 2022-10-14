import { Field, InputType, ID } from '@nestjs/graphql';
import { NftPropertiesDtoGql } from './nft-properties.dto';

@InputType()
export class CreateNftDtoGql {
  @Field()
  name: string;

  @Field()
  image: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => ID)
  collectionId: string;

  @Field()
  supply: string;

  @Field((type) => [String])
  externalLinks: string[];

  @Field((type) => [String])
  tags: string[];

  @Field((type) => NftPropertiesDtoGql)
  properties: NftPropertiesDtoGql;

}
