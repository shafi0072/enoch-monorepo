import { SignUpType, _2FAauthenticationType } from 'src/db/ENUMS/enums';

export interface Token {
  _id?:string
  email: string;
  userId: string;
  expiry: string;
  is2FAEnabled: boolean;
  isEmailPasswordVerified: boolean;
  is2FAVerified: boolean;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  countryCode?: string;
  phoneNumber?: string;
  signUpType?: SignUpType;
  _2FAuthenticationType?: _2FAauthenticationType;
  username?: string;
}
