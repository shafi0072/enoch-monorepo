import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MediaPrivacy } from 'src/db/ENUMS/enums';

@ObjectType()
export class Media {
  @Field((type) => ID)
  _id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  thumbnail?: string;

  @Field(() => [String], { nullable: true })
  hashtags?: string[];

  @Field(() => MediaPrivacy, { nullable: true })
  privacyStatus?: MediaPrivacy;

  @Field({ nullable: true })
  pricePerView?: number;

  @Field({ nullable: true })
  video?: string;

  @Field((type) => ID)
  userId: string;
}
