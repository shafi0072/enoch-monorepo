import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { AccountType } from 'src/shared/enums/account-type';
import { Gender } from 'src/shared/enums/gender';
import { OnBoardingScreen } from 'src/shared/enums/onboarding-screen';
import { ReasonHereFor } from 'src/shared/enums/reason-here-for';
import { RelationshipStatus } from 'src/shared/enums/relationship-status';
import { AvatarCardType, SignUpType } from '../ENUMS/enums';
import { Community } from './community.schema';
import { Industry } from './industry.schema';
import { NewsChannel } from './newsChannel.schema';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop({type: mongoose.Schema.Types.ObjectId})
  _id: string

  @Prop()
  userId: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({
    type: String,
    required: false,
    enum: OnBoardingScreen,
    default: OnBoardingScreen.OnBoarding,
  })
  activeOnBoardingScreen: string;

  @Prop({
    type: String,
    enum: AccountType,
    default: AccountType.Individual,
  })
  accountType: string;

  @Prop()
  username: string;

  @Prop({ default: '1990-01-01' })
  dateOfBirth: string;

  @Prop()
  hideDateOfBirth: boolean;

  @Prop({
    type: String,
    enum: Gender,
  })
  gender: string;

  @Prop()
  hideGender: boolean;

  @Prop()
  country: string;

  @Prop()
  hideCountry: boolean;

  @Prop({})
  website: string;

  @Prop()
  bio: string;

  @Prop({
    type: String,
    enum: RelationshipStatus,
  })
  relationshipStatus: string;

  @Prop({
    type: String,
    enum: ReasonHereFor,
  })
  hereFor: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Industry' })
  industryType: Industry;


  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }] })
  followee: User[];

  @Prop((type) => [NewsChannel])
  subscribedNewsChannel: NewsChannel[];

  @Prop({ default: SignUpType.LOCAL, enum: SignUpType })
  signUpType: SignUpType;

  @Prop({ unique: true, lowercase: true, trim: true })
  email: string;

  @Prop()
  isDeleted: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: false })
  subscribedToEnochMails: boolean;

  @Prop({ default: false })
  isAgreedToTerms: boolean;

  @Prop({ default: false })
  hideRelationshipStatus: boolean;

  @Prop({ default: false })
  hideHereFor: boolean;

  @Prop({ default: false })
  _2FAEnabled: boolean;

  @Prop()
  _2FAAuthenticationType: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ default: false })
  isHandlerVerified: boolean;

  @Prop({ default: false })
  isMobileVerified: boolean;

  @Prop()
  phoneNumber: string;

  @Prop()
  otp: string;

  @Prop()
  otpExpiryTime: Date;

  @Prop()
  otpSentStatus: string;

  @Prop()
  emailOtp: string;

  @Prop()
  emailOtpExpiryTime: Date;

  @Prop({ default: false })
  isEmailOtpVerified: boolean;

 

  @Prop({ default: false })
  isGoogle2FAVerified: boolean;

 

  @Prop()
  industry: string;

  @Prop({ default: 0 })
  followersCount: number;

  @Prop({ default: 0 })
  followingCount: number;

  @Prop({ default: false })
  isOnboarded: boolean;

  @Prop({ nullable: true })
  avatarTitle?: string;

  @Prop({
    default:
      'https://enochforrdical.s3.us-east-2.amazonaws.com/EnochAvatar/apocalypse/userApocalypseavatar/Card1.png',
  })
  avatar: string;

  @Prop()
  industryWorksFor: string;

  @Prop({
    default:
      'https://enochforrdical.s3.us-east-2.amazonaws.com/EnochAvatar/aliens/AliensBG/Aliens-1.jpg',
  })
  backgroundImage: string;

  @Prop()
  cardTitle: string;

  @Prop({ default: '1' })
  avatarCard: string;

  @Prop()
  countryCode: string;


  @Prop({ default: false })
  isAgreedToOnboardingTerms: boolean;

  @Prop({ default: AvatarCardType.DIAMOND, enum: AvatarCardType })
  cardType: AvatarCardType;

  @Prop({ defalut: false })
  isOnboardingCompleted: boolean;
}

const schema = SchemaFactory.createForClass(User);

schema.index({ firstName: 'text', lastName: 'text' });

export const UserSchema = schema;
