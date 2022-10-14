import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';
import { MediaPrivacy } from 'src/db/ENUMS/enums';

@InputType()
export class AddMediaInput {
  @Field()
  @IsNotEmpty()
  @Length(1, 255)
  title?: string;

  @Field({ nullable: true })
  category?: string;

  @Field()
  @IsNotEmpty()
  thumbnail?: string;

  @Field(() => [String], { nullable: true })
  hashtags?: string[];

  @Field((type) => MediaPrivacy, { nullable: true })
  privacyStatus?: MediaPrivacy;

  @Field()
  pricePerView?: number;

  @Field()
  @IsNotEmpty()
  video?: string;
}
