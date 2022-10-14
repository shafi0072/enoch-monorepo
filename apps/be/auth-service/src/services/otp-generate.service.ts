const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const otpGenerator = require('otp-generator');
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import moment from 'moment';
import { EventEmitSubjects } from 'src/shared/enums/event-emit-subjects';
import { sendChangePhoneNumberEvent } from 'src/shared/interfaces/event-emit-interfaces';
import { OTPobject } from 'src/shared/interfaces/otp-interface';
import UserService from './user.service';

@Injectable()
export class OTPService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    @Inject('KAFKA_SERVICE') private natsServerClient: ClientKafka,
  ) {}

  async generateExpirationTime() {
    const expiresIn = moment()
      .add(this.configService.get('EXPIRY_MINUTES'), 'minutes')
      .format();
    return expiresIn;
  }
  async generateOTP(): Promise<string> {
    return otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
  }
  async generateOPTObject(): Promise<any> {
    const otp = await this.generateOTP();
    const expiry = await this.generateExpirationTime();
    const hashedOtp = CryptoJS.AES.encrypt(
      otp,
      await this.configService.get('JWT_SECRET'),
    ).toString();

    return {
      otp,
      expiry,
      hashedOtp,
    };
  }

  async getOldOtp(user): Promise<any> {
    const otp = await this.decrpytHashedOtp(user.otp);
    const hashedOtp = await user.otp;
    const expiry = await this.generateExpirationTime();
    return {
      otp,
      expiry,
      hashedOtp,
    };
  }

  async sendOtp(user) {
    const { otp, expiry, hashedOtp }: OTPobject = user.isLastOtpVerified
      ? await this.generateOPTObject()
      : await this.getOldOtp(user);

    const response: any = await this.userService.updateUser({
      id: user._id,
      otp: hashedOtp,
      otpExpiryTime: expiry,
      isLastOtpVerified: false,
    });
    this.natsServerClient.emit<string>(EventEmitSubjects.SMS_SEND_OTP, {
      phoneNumber: `${response.countryCode}${response.phoneNumber}`,
      userId: response.userId,
      otp,
      expiry,
      hashedOtp,
      expiryInMinutes: this.configService.get('EXPIRY_MINUTES'),
    });
  }

  async decrpytHashedOtp(hashedOtp: string) {
    const bytes = await CryptoJS.AES.decrypt(
      hashedOtp,
      await this.configService.get('JWT_SECRET'),
    );

    return await bytes.toString(CryptoJS.enc.Utf8);
  }

  async compareOtp(otp: string, hashedOtp: string) {
    return (await this.decrpytHashedOtp(hashedOtp)) == otp ? true : false;
  }

  async sendOtpToMail(user) {
    const { otp, expiry, hashedOtp }: OTPobject =
      await this.generateOPTObject();

    const response: any = await this.userService.updateUserChangeNumber({
      id: user._id,
      emailOtp: hashedOtp,
      emailOtpExpiryTime: expiry,
    });

    const payload: sendChangePhoneNumberEvent = {
      to: response.email,
      name: `${response.firstName} ${response.lastName}`,
      otp,
    };

    this.natsServerClient.emit<string>(
      EventEmitSubjects.EMAIL_SEND_CHANGE_PHONE_NUMBER_REQUEST,
      payload,
    );
  }
}
