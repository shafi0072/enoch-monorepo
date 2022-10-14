// enum Gender {
//     male  = "Male",
//     female   = "Female"
// }
// export interface NFT_Properties {
//     type: string;
//     sex: Gender;
//     race: string;
// }
  

import { Field, ID, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class NFT_Properties {
  @Field()
  type: string;

  @Field()
  sex: string;

  @Field()
  race: string;
}