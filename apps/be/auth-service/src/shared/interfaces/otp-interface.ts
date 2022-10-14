export interface OTPobject {
  otp: number;
  expiry: Date;
  hashedOtp: string;
}

export interface AddphoneNumberAndOtp {
  id: string;
  otp: string;
  otpExpiryTime: Date;
  phoneNumber: string;
  countryCode: string;
}
