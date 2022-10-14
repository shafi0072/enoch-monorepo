export interface SendOTP {
  phoneNumber: string;
  userId: string;
  otp: string;
  expiryTime: Date;
  hashedOtp: string;
  expiryInMinutes: string;
}
