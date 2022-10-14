import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NftPropertiesDtoGql {
  @Field()
  nftType: string;

  @Field()
  sex: string;

  @Field()
  race: string;

}
