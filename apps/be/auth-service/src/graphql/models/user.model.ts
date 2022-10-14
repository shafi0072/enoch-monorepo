import { Field, ObjectType } from '@nestjs/graphql';
import { AvatarCardType, SignUpType } from 'src/db/ENUMS/enums';
import { AccountType } from 'src/shared/enums/account-type';
import { Gender } from 'src/shared/enums/gender';
import { OnBoardingScreen } from 'src/shared/enums/onboarding-screen';
import { ReasonHereFor } from 'src/shared/enums/reason-here-for';
import { RelationshipStatus } from 'src/shared/enums/relationship-status';
import { CommunityModel } from './community.model';
import { IndustryModel } from './industry.model';
import { NewsChannelModel } from './news-channel.model';
import { UserExperience } from './userExperience.model';

@ObjectType()
export class User {
  @Field(() => String, { nullable: true })
  _id?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: false })
  email?: string;

  @Field(() => OnBoardingScreen, {
    nullable: true,
    description: `Active screen of onboarding, null means Onboarding is completed`,
  })
  activeOnBoardingScreen?: OnBoardingScreen;

  @Field(() => AccountType, {
    nullable: true,
  })
  accountType: AccountType;

  @Field({ nullable: true })
  userId?: string;

  @Field((type) => Gender, { nullable: true })
  gender?: Gender;

  @Field((type) => ReasonHereFor, { nullable: true })
  hereFor?: ReasonHereFor;

  @Field((type) => RelationshipStatus, { nullable: true })
  relationshipStatus?: RelationshipStatus;

  @Field({ nullable: true })
  dateOfBirth?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  hideDateOfBirth?: boolean;

  @Field({ nullable: true })
  hideRelationshipStatus?: boolean;

  @Field({ nullable: true })
  hideHereFor?: boolean;

  @Field({ nullable: true })
  hideCountry?: boolean;

  @Field({ nullable: true })
  isHandlerVerified?: boolean;

  @Field({ nullable: true })
  isEmailVerified?: boolean;

  @Field({ nullable: true })
  hideGender?: boolean;

  @Field((type) => SignUpType, { nullable: true })
  signUpType?: SignUpType;

  @Field({ nullable: true })
  accessToken: string;

  @Field(() => IndustryModel, { nullable: true })
  industryType?: IndustryModel;

  @Field(() => [IndustryModel], { nullable: true })
  interests?: IndustryModel[];

  @Field(() => [CommunityModel], { nullable: true })
  communities?: CommunityModel[];

  @Field(() => [NewsChannelModel], { nullable: true })
  newsChannels?: NewsChannelModel[];

  @Field(() => [User], { nullable: true })
  followee?: User[];

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

  @Field(() => [String], { nullable: true })
  selectedInterests?: string[];

  @Field(() => AvatarCardType, { nullable: true })
  cardType?: AvatarCardType;

  @Field({ nullable: true })
  isFollowing?: boolean;

  @Field({ nullable: true })
  isOnboardingCompleted?: boolean;

  @Field((type) => [UserExperience], { nullable: true })
  userJobExperience?: UserExperience[];
}
