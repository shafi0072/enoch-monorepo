import { gql } from "@apollo/client";

export const CHOOSE_2FA_METHOD_MUTATION = gql`
  mutation choose2faMethod($_2FAtype: String!) {
    chooseMethodfor2FA(_2FAtype: $_2FAtype) {
      getqrcode
      tempSecret
      message
      local2FAResponse
      methodSelectedtype
    }
  }
`;
