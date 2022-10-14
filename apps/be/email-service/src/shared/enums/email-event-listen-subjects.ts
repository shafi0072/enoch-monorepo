import { registerEnumType } from '@nestjs/graphql';

export enum EventListenSubjects {
  EMAIL_SEND_PASSKEY = 'email-send-passkey',
  SEND_OTP = 'email-send-otp',
  EMAIL_SEND_FORGOTPASSWORD = 'email-send-forgotPassword',
  EMAIL_SEND_VERIFY_SIGNUP = 'email-send-verifyEmail',
  EMAIL_VERIFY_SUCCESS = 'email-send-successVerifyEmail',
  EMAIL_SEND_CHANGE_PHONE_NUMBER_REQUEST = 'email-send-emailChangeNumberRequest',
  EMAIL_SEND_SUCCESS_CHANGE_PHONE_NUMBER = 'email-send-successChangeNumber',
  EMAIL_SEND_CONTACT = 'email-send-contact',
}

registerEnumType(EventListenSubjects, {
  name: 'EventListenSubjects',
});
