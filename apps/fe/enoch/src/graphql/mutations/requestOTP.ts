import { gql } from "@apollo/client";

export const ADD_PHONE_NUMBER_FOR_VERIFICATION_MUTATION = gql`
  mutation addPhone($phoneNumber: String!, $countryCode: String!) {
    addPhoneNumberForVerification(phoneNumber: $phoneNumber, countryCode: $countryCode)
  }
`;


export const REQUEST_OTP_FOR_LOCAL_LOGIN = gql`
  mutation {
    requestOtpFor2FAVerification
  }
`;

export const RESEND_OTP_FOR_SIGNIN = gql`
  mutation {
    resendOtpForSignIn
  }
`;