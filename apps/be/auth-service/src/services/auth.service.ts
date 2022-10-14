import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import * as bcrypt from 'bcrypt';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import UserService from './user.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGE } from '../constant.json';
import { EventEmitSubjects } from 'src/shared/enums/event-emit-subjects';
import {
  emailVerifySuccessEvent,
  sendForgotPasswordEvent,
  sendsuccessChangenumberEmailiEvent,
  sendVerifySignUpEmailEvent,
} from 'src/shared/interfaces/event-emit-interfaces';
import { OTPService } from './otp-generate.service';
import { Token } from 'src/shared/interfaces/token-interface';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly OTPService: OTPService,
    private configService: ConfigService,
    @Inject('KAFKA_SERVICE') private natsServerClient: ClientKafka,
  ) {}

  async validate(email: string, password: string, isLoginByEmail: boolean) {
    const user = isLoginByEmail
      ? await this.usersService.getUserByEmail(email)
      : await this.usersService.getUserByPhoneNumber(email);

    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (await bcrypt.compare(password, user.password)) {
      return user;
    } else {
      throw new HttpException(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async createToken({
    email,
    userId,
    expiry,
    is2FAEnabled,
    isEmailPasswordVerified,
    is2FAVerified,
    isEmailVerified,
    isMobileVerified,
    countryCode,
    phoneNumber,
    signUpType,
    _2FAuthenticationType,
    username,
    _id,
  }: Token): Promise<{ accessToken: string }> {
    const payload = {
      id: _id,
      email: email,
      sub: userId,
      is2FAEnabled,
      isEmailPasswordVerified,
      is2FAVerified,
      isEmailVerified,
      isMobileVerified,
      countryCode,
      phoneNumber,
      signUpType,
      _2FAuthenticationType,
      username,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: expiry,
      }),
    };
  }

  async createSimpleToken(
    email: string,
    userId: string,
    expiry: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      email: email,
      sub: userId,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: expiry,
      }),
    };
  }

  async verify(token: string) {
    const decoded = this.decodeToken(token);
    const user = await this.usersService.getUserByEmail(decoded.email);

    if (!user) {
      throw new Error(ERROR_MESSAGES.UNABLE_TO_GET_USER_FROM_DECODED_TOKEN);
    }

    return user;
  }

  decodeToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  async getDetailsOfGoogleToken(token) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: this.configService.get('GOOGLE_CLIENT_ID'),
    });
    const payload = await ticket.getPayload();

    return payload;
  }

  async forgotPassword(email: string): Promise<string> {
    const user: any = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_EMAIL);
    }
    const token = await this.createSimpleToken(user.email, user.userId, '1h');
    try {
      const payload: sendForgotPasswordEvent = {
        to: email,
        name: `${user.firstName}`,
        token: token.accessToken,
      };

      this.natsServerClient.emit<string>(
        EventEmitSubjects.EMAIL_SEND_FORGOTPASSWORD,
        payload,
      );

      return SUCCESS_MESSAGE.EMAIL_SENT_SUCCESS;
    } catch (e) {
      throw new Error(ERROR_MESSAGES.ERROR_WITH_EMAIL_ID);
    }
  }

  async sendEmailForVerification(email: string, token: any): Promise<string> {
    const user: any = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_EMAIL);
    }
    const payload: sendVerifySignUpEmailEvent = {
      to: email,
      name: `${user.firstName} ${user.lastName}`,
      token: token.accessToken,
    };

    this.natsServerClient.emit<string>(
      EventEmitSubjects.EMAIL_SEND_VERIFY_SIGNUP,
      payload,
    );

    return SUCCESS_MESSAGE.EMAIL_SENT_SUCCESS;
  }

  async verifyEmailVerificationToken(token: string) {
    const user = (await this.verify(token)) as any;
    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND_IN_DECODE_TOKEN);
    }

    await this.usersService.updateUser({
      id: user._id,
      isEmailVerified: true,
    });

    const enochUrl = this.configService.get('ENOCH_LOGIN_URL');
    const payload: emailVerifySuccessEvent = {
      to: user.email,
      name: `${user.firstName} ${user.lastName}`,
      enochUrl,
    };
    this.natsServerClient.emit<string>(
      EventEmitSubjects.EMAIL_VERIFY_SUCCESS,
      payload,
    );

    const accessToken = await this.createToken({
      ...this.decodeToken(token),
      expiry: '1d',
      isEmailVerified: true,
    });

    return { ...user.toJSON(), accessToken: accessToken.accessToken };
  }
  validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  async sendChangephoneNumberEmailveriFication(user): Promise<string> {
    await this.OTPService.sendOtpToMail(user);
    return SUCCESS_MESSAGE.EMAIL_SENT_SUCCESS;
  }

  async sendEmailSuccessChangeNumber(email: string): Promise<string> {
    const user: any = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_EMAIL);
    }
    const payload: sendsuccessChangenumberEmailiEvent = {
      to: email,
      name: `${user.firstName} ${user.lastName}`,
    };
    this.natsServerClient.emit<String>(
      EventEmitSubjects.EMAIL_SEND_SUCCESS_CHANGE_PHONE_NUMBER,
      payload,
    );
    return SUCCESS_MESSAGE.EMAIL_SENT_SUCCESS;
  }
}
