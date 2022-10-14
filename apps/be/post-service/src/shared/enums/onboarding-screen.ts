import { registerEnumType } from '@nestjs/graphql';

export enum OnBoardingScreen {
  OnBoarding = 'OnBoarding',
  ChooseAccountType = 'ChooseAccountType',
  FillPersonalInformation = 'FillPersonalInformation',
  ChooseIndustryType = 'ChooseIndustryType',
  ChooseInteresedThings = 'ChooseInteresedThings',
  SelectUsersToFollow = 'SelectUsersToFollow',
  SelectInterestedCommunities = 'SelectInterestedCommunities',
  SubscribeLatestChannels = 'SubscribeLatestChannels',
  ChooseAvatar = 'ChooseAvatar',
  CreateProfile = 'CreateProfile',
  AcceptTermsOfService = 'AcceptTermsOfService',
  OnboardingCompleted = 'OnboardingCompleted',
  FeaturePopupScreen = 'FeaturePopupScreen',
  WelcomeScreenAfterOnboarding = 'WelcomeScreenAfterOnboarding',
  UpdateDetailsAfterOnBoardingCompletion = 'UpdateDetailsAfterOnBoardingCompletion',
}

registerEnumType(OnBoardingScreen, {
  name: 'OnBoardingScreen',
});
