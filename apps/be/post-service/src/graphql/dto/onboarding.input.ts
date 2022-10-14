import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { AvatarCardType } from 'src/db/ENUMS/enums';
import { Gender } from 'src/shared/enums/gender';
import { ReasonHereFor } from 'src/shared/enums/reason-here-for';
import { RelationshipStatus } from 'src/shared/enums/relationship-status';
import { AccountType } from '../../shared/enums/account-type';
import { OnBoardingScreen } from '../../shared/enums/onboarding-screen';

@InputType()
export class OnboardingInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => AccountType, { nullable: true })
  accountType?: AccountType;

  @IsNotEmpty()
  @Field(type => OnBoardingScreen)
  activeOnBoardingScreen: OnBoardingScreen;

  @Field({ nullable: true })
  dateOfBirth: string;

  @Field({ nullable: true })
  hideDateOfBirth: boolean;

  @Field(type => Gender, { nullable: true })
  gender: Gender;

  @Field({ nullable: true })
  hideGender: boolean;

  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  hideCountry: boolean;

  @Field({ nullable: true })
  website: string;

  @Field({ nullable: true })
  bio: string;

  @Field(type => RelationshipStatus, { nullable: true })
  relationshipStatus: RelationshipStatus;

  @Field({ nullable: true })
  hideRelationshipStatus: boolean;

  @Field(type => ReasonHereFor, { nullable: true })
  hereFor: ReasonHereFor;

  @Field({ nullable: true })
  hideHereFor: boolean;

  @Field({ nullable: true })
  industryType?: string;

  @Field(type => [String], { nullable: true })
  interests?: string[];

  @Field(type => [String], { nullable: true })
  communities?: string[];

  @Field(type => [String], { nullable: true })
  followee?: string[];

  @Field(type => [String], { nullable: true })
  newsChannels?: string[];

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  avatarTitle?: string;

  @Field({ nullable: true })
  backgroundImage?: string;

  @Field({ nullable: true })
  isAgreedToOnboardingTerms: boolean;

  @Field(() => AvatarCardType, { nullable: true })
  cardType?: AvatarCardType;
}
