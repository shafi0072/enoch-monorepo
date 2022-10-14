import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation signUp($CreateUserInput: CreateUserInput!, $passkey: String!) {
    signUp(signupUserInput: $CreateUserInput, passkey: $passkey) {
      firstName
      email
      userId
      accessToken
    }
  }
`;

export const SIGNIN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!, $passkey: String!) {
    signIn(email: $email, password: $password, passkey: $passkey) {
      accessToken
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const SET_NEW_PASSWORD_MUTATION = gql`
  mutation setNewPassword(
    $password: String!
    $confirmPassword: String!
    $token: String!
  ) {
    setNewPassword(
      password: $password
      confirmPassword: $confirmPassword
      token: $token
    )
  }
`;

export const RESET_PASSWORD_WITH_2FA = gql`
  mutation ($recoverPasswordInput: RecoverPasswordInput!) {
    recoverPasswordWith2FA(recoverPasswordInput: $recoverPasswordInput) {
      email
      _2FAEnabled
      _2FAAuthenticationType
      accessToken
      phoneNumber
      countryCode
    }
  }
`;

export const REQUEST_OTP_FOR_PASSWORD_RECOVERY = gql`
  mutation ($token: String!) {
    requestOtpforPasswordRecovery(token: $token)
  }
`;

export const VERIFY_OTP_FOR_PASSWORD_RECOVERY = gql`
  mutation ($token: String!, $OTP: String!) {
    verifyOtpForPasswordRecovery(token: $token, OTP: $OTP) {
      accessToken
    }
  }
`;

export const CHANGE_PHONE_NUMBER_REQUEST = gql`
  mutation {
    changePhoneNumberRequest
  }
`;

export const CONFIRM_CHANGE_PHONE_NUMBER_OTP = gql`
  mutation ($OTP: String!) {
    confirmChangePhoneNumberOtp(OTP: $OTP)
  }
`;

export const CHANGE_MY_PHONE_NUMBER = gql`
  mutation ($countryCode: String!, $phoneNumber: String!) {
    changeMyPhoneNumber(countryCode: $countryCode, phoneNumber: $phoneNumber)
  }
`;

export const RESEND_CHANGE_PHONE_NUMBER_OTP = gql`
  mutation {
    resendChangePhoneNumberOtp
  }
`;

export const VERIFY_OTP_FOR_CP = gql`
  mutation ($OTP: String!) {
    verifyOtpForCP(OTP: $OTP)
  }
`;

export const IS_EMAIL_VERIFIED = gql`
  mutation isEmailVerified {
    isEmailVerified {
      isEmailVerified
      accessToken
    }
  }
`;
