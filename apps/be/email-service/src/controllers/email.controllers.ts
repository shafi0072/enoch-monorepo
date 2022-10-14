import { ClientKafka, ClientProxy, EventPattern } from '@nestjs/microservices';
import { Controller, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/services/email.service';
import { EMAIL_MESSAGES } from '../constant.json';
import {
  EmailVerifySuccess,
  IncomingMessage,
  sendChangePhoneNumberEvent,
  sendForgotPasswordEvent,
  SendPasskeyEvent,
  sendsuccessChangenumberEmailiEvent,
  sendVerifySignUpEmailEvent,
} from 'src/shared/interfaces/event-recieve-interface';
import { EventListenSubjects } from 'src/shared/enums/email-event-listen-subjects';
import { EventEmitSubjects } from 'src/shared/enums/event-emit-subjects';
@Controller()
export class EmailController {
  private readonly clientAppUrl: string;
  constructor(
    @Inject('KAFKA_SERVICE') private natsServerClient: ClientKafka,
    private emailService: EmailService,
    private readonly configService: ConfigService,
  ) {
    this.clientAppUrl = this.configService.get<string>('FE_APP_URL');
  }

  @EventPattern(EventListenSubjects.EMAIL_SEND_PASSKEY)
  async sendEmail({ value }: IncomingMessage<SendPasskeyEvent>): Promise<void> {
    const { to, passkey } = value;
    const enochAppLink = `${this.clientAppUrl}`;
    const mail: any = await this.emailService.sendPasskeyEmail({
      to,
      subject: EMAIL_MESSAGES.PASSKEY_SUBJECT,
      enochAppLink,
      passkey,
    });
    if (mail?.accepted?.length < 0) {
      return;
    }
    const payload = {
      email: to,
      hashedPassword: passkey,
    };
    this.natsServerClient.emit<string>(
      EventEmitSubjects.CREATE_ALLOWED_USER,
      payload,
    );
  }

  @EventPattern(EventListenSubjects.EMAIL_SEND_FORGOTPASSWORD)
  async sendForgotPasswordMail({
    value: data,
  }: IncomingMessage<sendForgotPasswordEvent>): Promise<void> {
    const { to, name, token } = data;
    const forgotLink = `${this.clientAppUrl}/auth/reset-password?token=${token}`;
    await this.emailService.resetPassword(
      to,
      EMAIL_MESSAGES.FORGOT_PASSWORD_SUBJECT,
      forgotLink,
      name,
    );
  }

  @EventPattern(EventListenSubjects.EMAIL_SEND_VERIFY_SIGNUP)
  async sendVerifySignUpMail({
    value: data,
  }: IncomingMessage<sendVerifySignUpEmailEvent>): Promise<void> {
    const { to, name, token } = data;
    const verifyLink = `${this.clientAppUrl}/auth/verify-user-email?token=${token}`;
    await this.emailService.sendVerifyEmail(
      to,
      name,
      EMAIL_MESSAGES.VERIFY_SIGNUP_USER,
      verifyLink,
    );
  }

  @EventPattern(EventListenSubjects.EMAIL_VERIFY_SUCCESS)
  async successVerifiedEmail({
    value: data,
  }: IncomingMessage<EmailVerifySuccess>): Promise<void> {
    const { to, name, enochUrl } = data;

    await this.emailService.successMail(
      to,
      name,
      EMAIL_MESSAGES.VERIFIED_EMAIL,
      enochUrl,
    );
  }

  @EventPattern(EventListenSubjects.EMAIL_SEND_CHANGE_PHONE_NUMBER_REQUEST)
  async changePhoneNumberEmail({
    value,
  }: IncomingMessage<sendChangePhoneNumberEvent>): Promise<void> {
    const { to, name, otp } = value;
    await this.emailService.sendChangeNumberEmail(
      to,
      name,
      EMAIL_MESSAGES.CHANGE_PHONE_NUMBER,
      otp,
    );
  }

  @EventPattern(EventListenSubjects.EMAIL_SEND_SUCCESS_CHANGE_PHONE_NUMBER)
  async successChangePhoneNumberEmail({
    value,
  }: IncomingMessage<sendsuccessChangenumberEmailiEvent>): Promise<void> {
    const { to, name } = value;
    await this.emailService.sendSuccessChangeNumberEmail(
      to,
      name,
      EMAIL_MESSAGES.CHANGE_PHONE_NUMBER_SUCCESS,
    );
  }
}
