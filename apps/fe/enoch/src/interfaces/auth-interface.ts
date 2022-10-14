import {
  AvatarCardType,
  OnBoardingScreen,
} from "../constants/onboarding-enums";

export interface RegisterUserInterface {
  CreateUserInput: {};
  passkey: string;
}

export interface LoginUserInterface {
  email: string;
  password: string;
  passkey: string;
}

export interface CountryCodesInterface {
  code?: string;
  dial_code?: string;
  name?: string;
}

export interface OnBoardingDto {
  accountType?: string;
  activeOnBoardingScreen: OnBoardingScreen;
  dateOfBirth?: string;
  hideDateOfBirth?: boolean;
  gender?: string;
  hideGender?: boolean;
  country?: string;
  hideCountry?: boolean;
  website?: string;
  bio?: string;
  relationshipStatus?: string;
  hideRelationshipStatus?: boolean;
  hereFor?: string;
  hideHereFor?: boolean;
  industryType?: string;
  interests?: string[];
  communities?: string[];
  subscribedNewsChannel?: string[];
  newsChannels?: string[];
  avatar?: string;
  username?: string;
  avatarTitle?: string;
  backgroundImage?: string;
  isAgreedToOnboardingTerms?: boolean;
  cardType?: AvatarCardType;
  firstName?: string;
  lastName?: string;
}
