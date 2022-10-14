import { AvatarCardType } from "src/db/ENUMS/enums";

export interface OTPobject {
  otp: number;
  expiry: Date;
  hashedOtp: string;
}

export interface AddphoneNumberAndOtp {
  id: string;
  otp: string;
  otpExpiryTime: Date;
  phoneNumber: string;
  countryCode: string;
}

export interface UserInterface{
  _id:string;
  username: string;
  firstName: string;
  bio: string;
  accountType: string;
  lastName: string;
  gender: string;
  avatarTitle?: string;
  avatar: string;
  backgroundImage: string;
  avatarCard: string;
  isOnboardingCompleted: boolean;
  cardType: AvatarCardType;
  email: string;
}

export interface IncomingMessage<T = any> {
  topic: string;
  partition: number;
  timestamp: string;
  size: number;
  attributes: number;
  offset: string;
  key: any;
  value: T;
  headers: Record<string, any>;
}