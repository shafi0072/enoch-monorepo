import { gql } from "@apollo/client";

export const VERIFY_ACCESS_TOKEN = gql`
  mutation verifyUserEmail($token: String!) {
    verifyUserEmail(token: $token) {
      firstName
      lastName
      accessToken
    }
  }
`;

export const RESEND_VERIFY_EMAIL = gql`
  mutation {
    resendVerificationEmail
  }
`;

export const GOOGLE_LOGIN_MUTATION = gql`
  mutation googleSignin($googleToken: String!, $passkey: String!) {
    googleSignin(googleToken: $googleToken, passkey: $passkey) {
      accessToken
    }
  }
`;