import { registerEnumType } from '@nestjs/graphql';

export enum EventEmitSubjects {
  EMAIL_SEND_PASSKEY = 'email:send:passkey',
  EMAIL_SEND_FORGOTPASSWORD = 'email:send:forgotPassword',
  SEND_OTP = 'email:send:otp',
  SMS_SEND_OTP = 'sms:send:sendOtp',
  EMAIL_SEND_VERIFY_SIGNUP = 'email:send:verifyEmail',
  EMAIL_VERIFY_SUCCESS = 'email:send:successVerifyEmail',
  EMAIL_SEND_CHANGE_PHONE_NUMBER_REQUEST = 'email:send:emailChangeNumberRequest',
  EMAIL_SEND_SUCCESS_CHANGE_PHONE_NUMBER = 'email:send:successChangeNumber',
}

registerEnumType(EventEmitSubjects, {
  name: 'EventEmitSubjects',
});
