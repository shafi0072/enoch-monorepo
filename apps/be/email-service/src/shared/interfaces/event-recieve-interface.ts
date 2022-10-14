export interface SendPasskeyEvent {
  to: string;
  passkey: string;
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

export interface sendForgotPasswordEvent {
  to: string;
  name: string;
  token: string;
}

export interface sendVerifySignUpEmailEvent {
  to: string;
  name: string;
  token: string;
  verifyImage: string;
  logoImage: string;
}

export interface EmailVerifySuccess {
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

export interface PasskeyMailInterface {
  to: string;
  subject: string;
  enochAppLink: string;
  passkey: string;
}
