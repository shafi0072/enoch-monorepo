const bycrypt = require('bcrypt');
import { _2FA, _2FADocument } from 'src/db/schemas/_2FA.schema';
import speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import moment from 'moment';
import { Injectable } from '@nestjs/common';
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGE,
  CONSTANT_VARIABLE,
} from '../constant.json';
import { setUpGoogle2FA } from 'src/graphql/models/setUpGoogle2FA.model';
import UserService from './user.service';
import { _2FAauthenticationType } from 'src/db/ENUMS/enums';
import { User } from 'src/db/schemas/user.schema';
import { OTPService } from './otp-generate.service';
@Injectable()
export class _2FAService {
  constructor(
    private readonly userService: UserService,
    private otpService: OTPService,
  ) {}

  async verifyUserOTP(otp, user): Promise<any> {
    if (user.otp == null) {
      return ERROR_MESSAGES.OTP_VERIFY_FAIL;
    }

    if (moment().isBefore(user.otpExpiryTime)) {
      const validateOTP = await this.otpService.compareOtp(`${otp}`, user.otp);
      if (!validateOTP) {
        return ERROR_MESSAGES.OTP_VERIFY_FAIL;
      }
      await this.userService.updateUser({
        id: user._id,
        isLastOtpVerified: true,
      });
      return SUCCESS_MESSAGE.OTP_VERIFIED_SUCCESFULLY;
    } else {
      return ERROR_MESSAGES.OTP_VERIFY_FAIL;
    }
  }

  async setUp2FAWithGoogleAuth(user): Promise<setUpGoogle2FA | String> {
    let returnValue: any;

    const currentUser = await user;

    if (currentUser.otpSecret) {
      await this.userService.updateUser({
        id: user._id,
        _2FAAuthenticationType: _2FAauthenticationType.GOOGLE_AUTHENTICATOR,
      });
      returnValue = {
        getqrcode: currentUser.otpAuthURL,
        tempsecrete: currentUser.otpSecret,
        message: SUCCESS_MESSAGE.YOUR_GOOGLE_AUTH_SECRETE,
      };

      return returnValue;
    }
    const secret = await speakeasy.generateSecret({
      length: 10,
      name: currentUser.email,
      issuer: CONSTANT_VARIABLE.BRAND_NAME,
    });

    const url = await speakeasy.otpauthURL({
      secret: secret.base32,
      label: currentUser.firstName + ' ' + currentUser.lastName,
      issuer: CONSTANT_VARIABLE.BRAND_NAME,
      encoding: CONSTANT_VARIABLE.ENCODE_TYPE,
    });

    const getqrcode = await QRCode.toDataURL(url);
    const tempSecret = await secret.base32;

    const updatecurrentUserData = await this.userService.updateUser({
      id: user._id,
      otpAuthURL: getqrcode,
      otpSecret: tempSecret,
      otpdataURL: url,
      _2FAAuthenticationType: _2FAauthenticationType.GOOGLE_AUTHENTICATOR,
    });

    if (updatecurrentUserData) {
      returnValue = {
        getqrcode,
        tempSecret,
        message: SUCCESS_MESSAGE.GOOGLE_2FA_SUCCESS,
      };
    }

    return returnValue;
  }

  async validateGoogle2FAOtp(token, user): Promise<String> {
    const currentUser = await user;

    const isVerified = await speakeasy.totp.verify({
      secret: currentUser.otpSecret,
      encoding: CONSTANT_VARIABLE.ENCODE_TYPE,
      token,
    });

    return isVerified
      ? SUCCESS_MESSAGE.TOKEN_VERIFY_SUCCESS
      : ERROR_MESSAGES.TOKEN_VERIFY_FAIL;
  }

  async validateOtpforPasswordRecovery(user: User, otp): Promise<any> {
    const validateOtp =
      user._2FAAuthenticationType == _2FAauthenticationType.LOCAL
        ? await this.verifyUserOTP(otp, user)
        : await this.validateGoogle2FAOtp(otp, user);

    return validateOtp;
  }

  async verifyUserEmailOTP(otp, user): Promise<any> {
    if (user.emailOtp == null) return ERROR_MESSAGES.OTP_VERIFY_FAIL;

    if (!moment().isBefore(user.emailOtpExpiryTime))
      return ERROR_MESSAGES.OTP_VERIFY_FAIL;

    const validateOTP = await this.otpService.compareOtp(
      `${otp}`,
      user.emailOtp,
    );

    if (!validateOTP) return ERROR_MESSAGES.OTP_VERIFY_FAIL;

    await this.userService.updateUser({
      id: user._id,
      isEmailOtpVerified: true,
    });
    return SUCCESS_MESSAGE.OTP_VERIFIED_SUCCESFULLY;
  }
}
