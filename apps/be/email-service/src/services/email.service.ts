import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { URLS, CONSTANT_VARIABLE, ERROR_MESSAGE } from '../constant.json';
import { PasskeyMailInterface } from 'src/shared/interfaces/event-recieve-interface';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public sendEmail(to: string, subject: string, body: string): Promise<any> {
    return this.mailerService.sendMail({
      from: this.configService.get<string>('EMAIL'),
      to: to,
      subject: subject,
      html: body,
    });
  }

  public async sendPasskeyEmail({
    to,
    subject,
    enochAppLink,
    passkey,
  }: PasskeyMailInterface): Promise<any> {
    return await this.mailerService
      .sendMail({
        to: to,
        from: this.configService.get<string>('EMAIL'),
        subject: subject,
        template: CONSTANT_VARIABLE.PASSKEY_TEMPLATE,
        context: {
          enochAppLink,
          verifyImage: URLS.VERIFYIMAGE,
          logoImage: URLS.LOGOIMAGE,
          passkey,
        },
      })
      .catch(() => {
        throw new Error(ERROR_MESSAGE.MAIL_TEMPLATE_FAIL);
      });
  }

  public async sendVerifyEmail(
    to: string,
    name: string,
    subject: string,
    verifyLink: string,
  ): Promise<any> {
    return await this.mailerService
      .sendMail({
        to: to,
        from: this.configService.get<string>('EMAIL'),
        subject: subject,
        template: CONSTANT_VARIABLE.VERITY_EMAIL_TEMPLATE,
        context: {
          name,
          verifyLink,
          verifyImage: URLS.VERIFYIMAGE,
          logoImage: URLS.LOGOIMAGE,
        },
      })
      .catch(() => {
        throw new Error(ERROR_MESSAGE.MAIL_TEMPLATE_FAIL);
      });
  }

  public async successMail(
    to: string,
    name: string,
    subject: string,
    enochSignInUrl: string,
  ): Promise<any> {
    return await this.mailerService
      .sendMail({
        to: to,
        from: this.configService.get<string>('EMAIL'),
        subject: subject,
        template: CONSTANT_VARIABLE.SUCCESS_EMAIL_TEMPLATE,
        context: {
          name,
          enochSignInUrl,
          verifyImage: URLS.VERIFYIMAGE,
          logoImage: URLS.LOGOIMAGE,
        },
      })
      .catch(() => {
        throw new Error(ERROR_MESSAGE.MAIL_TEMPLATE_FAIL);
      });
  }
  public sendChangeNumberEmail(
    to: string,
    name: string,
    subject: string,
    otp: number,
  ): Promise<any> {
    return this.mailerService
      .sendMail({
        to: to,
        from: this.configService.get<string>('EMAIL'),
        subject: subject,
        template: CONSTANT_VARIABLE.CHANGE_PHONE_NUMBER_EMAIL_TEMPLATE,
        context: {
          name,
          otp,
          verifyImage: URLS.VERIFYIMAGE,
          logoImage: URLS.LOGOIMAGE,
        },
      })
      .catch(() => {
        throw new Error(ERROR_MESSAGE.MAIL_TEMPLATE_FAIL);
      });
  }

  public async resetPassword(
    to: string,
    subject: string,
    forgotLink: string,
    name: string,
  ): Promise<any> {
    return await this.mailerService
      .sendMail({
        to: to,
        from: this.configService.get<string>('EMAIL'),
        subject: subject,
        template: CONSTANT_VARIABLE.PASSWORD_RESET_EMAIL_TEMPLATE,
        context: {
          forgotLink,
          name,
          verifyImage: URLS.VERIFYIMAGE,
          logoImage: URLS.LOGOIMAGE,
        },
      })
      .catch(() => {
        throw new Error(ERROR_MESSAGE.MAIL_TEMPLATE_FAIL);
      });
  }
  public async sendSuccessChangeNumberEmail(
    to: string,
    name: string,
    subject: string,
  ): Promise<any> {
    return await this.mailerService
      .sendMail({
        to: to,
        from: this.configService.get<string>('EMAIL'),
        subject: subject,
        template: CONSTANT_VARIABLE.SUCCESS_CHANGE_PHONE_NUMBER_EMAIL_TEMPLATE,
        context: {
          name,
          verifyImage: URLS.VERIFYIMAGE,
          logoImage: URLS.LOGOIMAGE,
        },
      })
      .catch(() => {
        throw new Error(ERROR_MESSAGE.MAIL_TEMPLATE_FAIL);
      });
  }
}
