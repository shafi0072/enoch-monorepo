import { gql } from "@apollo/client";

export const VERIFY_USER_OTP = gql`
  mutation verifyOTP($OTP: String!) {
    verifyUserOTP(OTP: $OTP) {
      isEmailVerified
      accessToken
      accountType
      activeOnBoardingScreen
      avatar
      avatarTitle
      backgroundImage
      bio
      country
      dateOfBirth
      email
      firstName
      gender
      hereFor
      isAgreedToOnboardingTerms
      lastName
      website
      lastName
      signUpType
      selectedInterests
      hideHereFor
      hideRelationshipStatus
      hideDateOfBirth
      hideCountry
      hideGender
      isOnboardingCompleted
    }
  }
`;
