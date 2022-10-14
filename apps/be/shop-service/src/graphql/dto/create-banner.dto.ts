import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBannerDtoGql {
  @Field()
  name: string;
}
