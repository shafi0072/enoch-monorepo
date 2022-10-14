export interface SendPasskeyEvent {
  to: string;
  passkey: string;
}

export interface sendForgotPasswordEvent {
  to: string;
  name: string;
  token: string;
}

export interface sendVerifySignUpEmailEvent {
  to: string;
  name: string;
  token: string;
}

export interface emailVerifySuccessEvent {
  to: string;
  name: string;
  enochUrl: string;
}

export interface sendChangePhoneNumberEvent {
  to: string;
  name: string;
  otp: number;
}
export interface sendsuccessChangenumberEmailiEvent {
  to: string;
  name: string;
}
