import { Field, ID, ObjectType,  } from '@nestjs/graphql';

@ObjectType()
export class NftProperties {

  @Field()
  nftType: string;

  @Field()
  sex: string;

  @Field()
  race: string;
}
