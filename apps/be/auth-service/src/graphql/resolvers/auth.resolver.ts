import {
  ConflictException,
  InternalServerErrorException,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { phone } from 'phone';
import { ConfigService } from '@nestjs/config';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { AuthService } from 'src/services/auth.service';
import UserService from 'src/services/user.service';
import { CreateUserInput } from '../dto/create-user.input';
import { AccessToken } from '../models/token.model';
import { User } from '../models/user.model';
import AllowedUserService from 'src/services/allowedUsers.service';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { ERROR_MESSAGES } from '../../constant.json';
import { ErrorCodes } from 'src/shared/enums/errr-codes';
import { OTPService } from 'src/services/otp-generate.service';
import { EventEmitSubjects } from 'src/shared/enums/event-emit-subjects';
import { _2FAService } from 'src/services/_2FA.service';
import { OTPobject } from 'src/shared/interfaces/otp-interface';
import { setUpGoogle2FA } from '../models/setUpGoogle2FA.model';
import { SUCCESS_MESSAGE } from '../../constant.json';
import { SignUpType, _2FAauthenticationType } from 'src/db/ENUMS/enums';
import { SingnInInput } from '../dto/sign-in-input';
import { PhoneNumber } from '../dto/phone-number';
import { RecoverPasswordInput } from '../dto/recover-password-input';
import { RecoverPasswordResponse } from '../models/recoverPasswordResponse';
import { VerifyOtpForPasswordRecoveryArgs } from '../dto/verity-password-recovery-otp';
import { EmailVerificationResponse } from '../models/email-verification-response';
import { UsernameArg } from '../dto/username.arg';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private allowedUserService: AllowedUserService,
    private otpService: OTPService,
    private _2FAservice: _2FAService,
    private readonly configService: ConfigService,
    @Inject('KAFKA_SERVICE') private natsServerClient: ClientKafka,
  ) {}

  @Mutation(() => User)
  async signUp(
    @Args('signupUserInput') createUserData: CreateUserInput,
    @Args('passkey') passkey: string,
  ): Promise<User | Error> {
    const { email, password, repeatPassword, phoneNumber } = createUserData;
    let newUser;
    let token;
    if (password !== repeatPassword) {
      throw new Error(ERROR_MESSAGES.PASSWORD_CONFIRM_PASSWORD_MISMATCH);
    }
    const comparedKey = await this.allowedUserService.comparePassKey(
      email,
      passkey,
    );

    if (!comparedKey) {
      throw new Error(ERROR_MESSAGES.INVALID_PASSKEY);
    }
    const phoneNumberExits = await this.userService.getUserByPhoneNumber(
      phoneNumber,
    );
    if (phoneNumberExits) {
      throw new ConflictException(ERROR_MESSAGES.PHONE_NUMBER_ALREADY_IN_USE);
    }

    try {
      newUser = await this.userService.createUser(
        createUserData,
        SignUpType.LOCAL,
      );
    } catch (e) {
      if (e.code === ErrorCodes.MONGOOSE_UNIQUE_VALUE_CONFLICT_ERROR_CODE) {
        throw new ConflictException(ERROR_MESSAGES.USER_ALREADY_EXISTS);
      } else {
        throw new InternalServerErrorException(e);
      }
    }

    token = await this.authService.createToken({
      _id: newUser._id,
      email: newUser.email,
      userId: newUser.userId,
      expiry: await this.configService.get('INITIAL_TOKEN_EXPIRY'),
      is2FAEnabled: newUser._2FAEnabled,
      isEmailPasswordVerified: true,
      is2FAVerified: false,
      isEmailVerified: newUser.isEmailVerified,
      isMobileVerified: newUser.isMobileVerified,
      countryCode: newUser.countryCode,
      phoneNumber: newUser.phoneNumber.slice(newUser.phoneNumber.length - 2),
      signUpType: newUser.signUpType,
    });
    newUser.accessToken = token.accessToken;
    await this.authService.sendEmailForVerification(newUser.email, token);
    return newUser;
  }

  @Mutation(() => AccessToken)
  async signIn(@Args() args: SingnInInput) {
    const { email, password, passkey } = args;
    const isLoginByEmail = await this.authService.validateEmail(email);

    const user: any = await this.authService.validate(
      email,
      password,
      isLoginByEmail,
    );

    const comparedKey = await this.allowedUserService.comparePassKey(
      user.email,
      passkey,
    );

    if (!comparedKey) {
      throw new Error(ERROR_MESSAGES.INVALID_PASSKEY);
    }

    if (
      user._2FAEnabled &&
      user._2FAAuthenticationType === _2FAauthenticationType.LOCAL &&
      user.phoneNumber
    ) {
      await this.otpService.sendOtp(user);
    }

    const token = await this.authService.createToken({
      _id: user._id,
      email: user.email,
      userId: user.userId,
      expiry: await this.configService.get('INITIAL_TOKEN_EXPIRY'),
      is2FAEnabled: user._2FAEnabled,
      isEmailPasswordVerified: true,
      is2FAVerified: false,
      isEmailVerified: user.isEmailVerified,
      isMobileVerified: user.isMobileVerified,
      signUpType: user.signUpType,
      countryCode: user.countryCode,
      phoneNumber: user.phoneNumber.slice(user.phoneNumber.length - 2),
    });

    return { accessToken: token.accessToken };
  }

  @Mutation(() => AccessToken)
  async googleSignin(
    @Args('googleToken') googleToken: string,
    @Args('passkey') passkey: string,
  ): Promise<any> {
    let token: any;
    const payload: any = await this.authService.getDetailsOfGoogleToken(
      googleToken,
    );

    const comparedKey = await this.allowedUserService.comparePassKey(
      payload.email,
      passkey,
    );

    if (!comparedKey) {
      throw new Error(ERROR_MESSAGES.INVALID_PASSKEY);
    }

    const userDataExist: any = await this.userService.getUserByEmail(
      payload.email,
    );

    if (userDataExist) {
      if (
        userDataExist._2FAEnabled === true &&
        userDataExist._2FAAuthenticationType == _2FAauthenticationType.LOCAL &&
        userDataExist.phoneNumber
      ) {
        await this.otpService.sendOtp(userDataExist);
      }
      token = await this.authService.createToken({
        _id: userDataExist._id,
        email: userDataExist.email,
        userId: userDataExist.userId,
        expiry: await this.configService.get('INITIAL_TOKEN_EXPIRY'),
        is2FAEnabled: userDataExist._2FAEnabled,
        isEmailPasswordVerified: true,
        is2FAVerified: false,
        isEmailVerified: true,
        isMobileVerified: userDataExist.isMobileVerified,
        signUpType: userDataExist.signUpType,
      });
    } else if (!userDataExist) {
      const newUser: any = await this.userService.createUser(
        {
          firstName: payload?.given_name,
          lastName: payload?.family_name,
          email: payload?.email,
          isEmailVerified: true,
          isAgreedToTerms: true,
        },
        SignUpType.GOOGLE,
      );
      if (newUser) {
        token = await this.authService.createToken({
          _id: newUser._id,
          email: newUser.email,
          userId: newUser.userId,
          expiry: await this.configService.get('INITIAL_TOKEN_EXPIRY'),
          is2FAEnabled: newUser._2FAEnabled,
          isEmailPasswordVerified: true,
          is2FAVerified: false,
          isEmailVerified: true,
          isMobileVerified: newUser.isMobileVerified,
          signUpType: newUser.signUpType,
        });
      } else {
        return {
          accessToken: null,
        };
      }
    }

    return {
      accessToken: token.accessToken,
    };
  }

  @Mutation(() => String)
  async forgotPassword(@Args('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Mutation(() => AccessToken)
  @UseGuards(GqlAuthGuard)
  async resetPassword(
    @CurrentUser() user,
    @Args('password') password: string,
    @Args('confirmPassword') confirmPassword: string,
  ) {
    let token: any;
    if (password !== confirmPassword) {
      throw new Error(ERROR_MESSAGES.PASSWORD_CONFIRM_PASSWORD_MISMATCH);
    }

    const updatedUser = await this.userService.updateUserPassword(
      user.userId,
      password,
    );
    token = await this.authService.createToken({
      _id: updatedUser._id,
      email: updatedUser.email,
      userId: updatedUser.userId,
      expiry: '1d',
      is2FAEnabled: updatedUser._2FAEnabled,
      isEmailPasswordVerified: true,
      is2FAVerified: false,
      isEmailVerified: updatedUser.isEmailVerified,
      isMobileVerified: updatedUser.isMobileVerified,
    });

    return { accessToken: token.accessToken };
  }

  @Mutation(() => String)
  async setNewPassword(
    @Args('password') password: string,
    @Args('confirmPassword') confirmPassword: string,
    @Args('token') token: string,
  ) {
    if (password !== confirmPassword) {
      throw new Error(ERROR_MESSAGES.PASSWORD_CONFIRM_PASSWORD_MISMATCH);
    }
    const user = await this.authService.verify(token);
    if (await bcrypt.compare(password, user.password)) {
      throw new Error(ERROR_MESSAGES.OLD_PASSWORD_CONFLICT);
    }
    await this.userService.updateUserPassword(user.userId, password);
    return SUCCESS_MESSAGE.YOUR_PASSWORD_HAS_BEEN_RESET_SUCCESSFULLY;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => setUpGoogle2FA)
  async chooseMethodfor2FA(
    @Args('_2FAtype') _2FAtype: _2FAauthenticationType,
    @CurrentUser() user,
  ) {
    if (_2FAtype == _2FAauthenticationType.LOCAL) {
      try {
        await this.userService.select2FAmethod(_2FAtype, user.userId);
      } catch (err) {
        throw new Error(err);
      }
      return {
        local2FAResponse: SUCCESS_MESSAGE.TWO_FA_METHOD_SELECTED_SUCCESFULLY,
        methodSelectedtype: _2FAauthenticationType.LOCAL,
      };
    }
    if (_2FAtype == _2FAauthenticationType.GOOGLE_AUTHENTICATOR) {
      const googel2FA = await this._2FAservice.setUp2FAWithGoogleAuth(user);

      return {
        ...(googel2FA as Object),
        methodSelectedtype: _2FAauthenticationType.GOOGLE_AUTHENTICATOR,
      };
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async addPhoneNumberForVerification(
    @Args() args: PhoneNumber,
    @CurrentUser() user: any,
  ) {
    const { countryCode, phoneNumber } = args;
    const phoneNumberExits = await this.userService.getUserByPhoneNumber(
      phoneNumber,
    );
    if (phoneNumberExits) {
      throw new ConflictException(ERROR_MESSAGES.PHONE_NUMBER_ALREADY_IN_USE);
    }
    const { otp, expiry, hashedOtp }: OTPobject =
      await this.otpService.generateOPTObject();

    await this.userService.addOtpAndExpiry({
      id: user.userId,
      otp: hashedOtp,
      otpExpiryTime: expiry,
      phoneNumber,
      countryCode,
    });

    this.natsServerClient.emit<string>(EventEmitSubjects.SMS_SEND_OTP, {
      phoneNumber: `${countryCode}${phoneNumber}`,
      userId: user.userId,
      otp,
      expiry,
      hashedOtp,
      expiryInMinutes: this.configService.get('EXPIRY_MINUTES'),
    });

    return SUCCESS_MESSAGE.OTP_SENT_SUCCESSFULLY;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async verifyUserOTP(@CurrentUser() user, @Args('OTP') OTP: string) {
    let token, isGoogleOtpVerified, isLocalOtpverified, updatedUser;

    if (
      user._2FAAuthenticationType == _2FAauthenticationType.GOOGLE_AUTHENTICATOR
    ) {
      isGoogleOtpVerified = await this._2FAservice.validateGoogle2FAOtp(
        OTP,
        user,
      );
      if (isGoogleOtpVerified != SUCCESS_MESSAGE.TOKEN_VERIFY_SUCCESS) {
        throw new Error(ERROR_MESSAGES.OTP_VERIFY_FAIL);
      }
      if (user.isGoogle2FAVerified == false) {
        updatedUser = await this.userService.updateUser({
          id: user._id,
          isGoogle2FAVerified: true,
          _2FAEnabled: true,
        });
      }
    }
    if (user._2FAAuthenticationType == _2FAauthenticationType.LOCAL) {
      isLocalOtpverified = await this._2FAservice.verifyUserOTP(OTP, user);
      if (isLocalOtpverified == ERROR_MESSAGES.OTP_VERIFY_FAIL) {
        throw new Error(ERROR_MESSAGES.OTP_VERIFY_FAIL);
      }
      if (user.isMobileVerified == false) {
        updatedUser = await this.userService.updateUser({
          id: user._id,
          isMobileVerified: true,
          _2FAEnabled: true,
        });
      }
    }

    token = await this.authService.createToken({
      _id: user._id,
      email: user.email,
      userId: user.userId,
      expiry: await this.configService.get('TWO_FA_TOKEN_EXIPRY'),
      is2FAEnabled: true,
      isEmailPasswordVerified: true,
      is2FAVerified: true,
      isEmailVerified: user.isEmailVerified,
      isMobileVerified:
        user._2FAAuthenticationType == _2FAauthenticationType.LOCAL
          ? true
          : user.isMobileVerified,
      countryCode: user.countryCode,
      phoneNumber: user.phoneNumber
        ? user.phoneNumber.slice(user.phoneNumber.length - 2)
        : '',
      _2FAuthenticationType: _2FAauthenticationType.GOOGLE_AUTHENTICATOR,
    });
    user = updatedUser ? updatedUser : user;

    return {
      ...user.toJSON(),
      accessToken: token.accessToken,
      selectedInterests: user.interests,
    };
  }

  @Mutation(() => EmailVerificationResponse)
  async verifyUserEmail(@Args('token') token: string) {
    const user: any = await this.authService.verifyEmailVerificationToken(
      token,
    );
    user.message = SUCCESS_MESSAGE.EMAIL_VERIFIED_SUCCESS;
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async requestOtpFor2FAVerification(@CurrentUser() user) {
    try {
      await this.otpService.sendOtp(user);
    } catch {
      throw new Error(ERROR_MESSAGES.ERROR_OCCURED_WHILE_SENDING_OTP);
    }
    return SUCCESS_MESSAGE.OTP_SENT_SUCCESSFULLY;
  }

  @Mutation(() => RecoverPasswordResponse)
  async recoverPasswordWith2FA(
    @Args('recoverPasswordInput') recoverPasswordInput: RecoverPasswordInput,
  ) {
    const { email } = recoverPasswordInput;

    const user: any = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    if (!user._2FAEnabled) {
      throw new Error(ERROR_MESSAGES.TWO_FA_NOT_ENABLED);
    }

    if (
      user._2FAAuthenticationType ===
      _2FAauthenticationType.GOOGLE_AUTHENTICATOR
    ) {
      user.phoneNumber = '';
    }
    const token = await this.authService.createToken({
      _id: user._id,
      email: user.email,
      userId: user.userId,
      expiry: await this.configService.get('INITIAL_TOKEN_EXPIRY'),
      is2FAEnabled: user._2FAEnabled,
      isEmailPasswordVerified: false,
      is2FAVerified: false,
      isEmailVerified: user.isEmailVerified,
      isMobileVerified: user.isMobileVerified,
      countryCode: user.countryCode,
      phoneNumber: user.phoneNumber.slice(user.phoneNumber.length - 2),
    });
    user.phoneNumber = user.phoneNumber.slice(user.phoneNumber.length - 2);
    user.accessToken = token.accessToken;
    return user;
  }

  @Mutation(() => String)
  async requestOtpforPasswordRecovery(@Args('token') token: string) {
    const user: any = await this.authService.verify(token);
    await this.otpService.sendOtp(user);
    return SUCCESS_MESSAGE.OTP_SENT_SUCCESSFULLY;
  }

  @Mutation(() => AccessToken)
  async verifyOtpForPasswordRecovery(
    @Args() args: VerifyOtpForPasswordRecoveryArgs,
  ) {
    const { token, OTP } = args;
    const isTokenValid: any = await this.authService.verify(token);
    const isOtpValid = await this._2FAservice.validateOtpforPasswordRecovery(
      isTokenValid,
      OTP,
    );
    if (isOtpValid == ERROR_MESSAGES.OTP_VERIFY_FAIL) {
      return {
        accessToken: '',
        message: ERROR_MESSAGES.OTP_VERIFY_FAIL,
      };
    }
    const newAccessToken = await this.authService.createToken({
      _id: isTokenValid._id,
      email: isTokenValid.email,
      userId: isTokenValid.userId,
      expiry: await this.configService.get('INITIAL_TOKEN_EXPIRY'),
      is2FAEnabled: isTokenValid._2FAEnabled,
      isEmailPasswordVerified: false,
      is2FAVerified: false,
      isEmailVerified: isTokenValid.isEmailVerified,
      isMobileVerified: isTokenValid.isMobileVerified,
    });
    return {
      accessToken: newAccessToken.accessToken,
      message: SUCCESS_MESSAGE.OTP_VERIFIED_SUCCESFULLY,
    };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async changePhoneNumberRequest(@CurrentUser() user) {
    let changeStatus;
    try {
      changeStatus =
        await this.authService.sendChangephoneNumberEmailveriFication(user);
    } catch (e) {
      throw new ConflictException(
        ERROR_MESSAGES.UNABLE_TO_SEND_CHANGE_PHONE_NUMBER_MAIL,
      );
    }
    return changeStatus;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async verifyOtpForCP(@Args('OTP') OTP: string, @CurrentUser() user) {
    const isEmailOtpverified = await this._2FAservice.verifyUserEmailOTP(
      OTP,
      user,
    );
    if (isEmailOtpverified == ERROR_MESSAGES.OTP_VERIFY_FAIL) {
      throw new Error(ERROR_MESSAGES.OTP_VERIFY_FAIL);
    }
    return SUCCESS_MESSAGE.OTP_VERIFIED_SUCCESFULLY;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async changeMyPhoneNumber(
    @Args() args: PhoneNumber,
    @CurrentUser() user: any,
  ) {
    const { countryCode, phoneNumber } = args;
    if (!(await phone(`${countryCode}${phoneNumber}`)).isValid)
      return ERROR_MESSAGES.INVALID_PHONE_NUMBER;

    if (!user.isEmailOtpVerified)
      return ERROR_MESSAGES.UNABLE_TO_CHANGE_PHONE_NUMBER;

    const phoneNumberExits = await this.userService.getUserByPhoneNumber(
      phoneNumber,
    );
    if (phoneNumberExits) {
      throw new ConflictException(ERROR_MESSAGES.PHONE_NUMBER_ALREADY_IN_USE);
    }

    await this.otpService.sendOtp(user);
    await this.userService.updateUser({
      id: user._id,
      phoneNumber,
      countryCode,
    });
    return SUCCESS_MESSAGE.OTP_SENT_SUCCESSFULLY;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async resendVerificationEmail(@CurrentUser() user) {
    const token = await this.authService.createToken({
      _id: user._id,
      email: user.email,
      userId: user.userId,
      expiry: await this.configService.get('EMAIL_VERIFICATION_LINK_EXPIRY'),
      is2FAEnabled: user._2FAEnabled,
      isEmailPasswordVerified: true,
      is2FAVerified: false,
      isEmailVerified: user.isEmailVerified,
      isMobileVerified: user.isMobileVerified,
      countryCode: user.countryCode,
      phoneNumber: user.phoneNumber.slice(user.phoneNumber.length - 2),
      signUpType: user.signUpType,
    });
    user.accessToken = token.accessToken;
    await this.authService.sendEmailForVerification(user.email, token);
    return SUCCESS_MESSAGE.EMAIL_SENT_SUCCESS;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async resendOtpForSignIn(@CurrentUser() user) {
    await this.otpService.sendOtp(user);
    return SUCCESS_MESSAGE.OTP_SENT_SUCCESSFULLY;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => EmailVerificationResponse)
  async isEmailVerified(@CurrentUser() user) {
    if (!user?.isEmailVerified) {
      throw new Error('Email not verified');
    }
    const token = await this.authService.createToken({
      _id: user._id,
      email: user.email,
      userId: user.userId,
      expiry: await this.configService.get('INITIAL_TOKEN_EXPIRY'),
      is2FAEnabled: user._2FAEnabled,
      isEmailPasswordVerified: true,
      is2FAVerified: false,
      isEmailVerified: user.isEmailVerified,
      isMobileVerified: user.isMobileVerified,
      signUpType: user.signUpType,
      countryCode: user.countryCode,
      phoneNumber: user.phoneNumber.slice(user.phoneNumber.length - 2),
    });

    return {
      isEmailVerified: user?.isEmailVerified || false,
      accessToken: token.accessToken,
    };
  }

  @Mutation(() => String)
  async validateUsername(@Args() args: UsernameArg) {
    const { username } = args;
    const user = await this.userService.find({ username });
    if (user.length !== 0) {
      throw new Error('Username already taken');
    }

    return 'You can have this username';
  }
}
