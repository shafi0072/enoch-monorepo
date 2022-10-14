import { Controller, Get, Post } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { SMSService } from "src/services/sms.service";
import { EventListeningSubjects } from "src/shared/enums/listen.subject.enums";
import {
  IncomingMessage,
  SendMessage,
} from "src/shared/interfaces/send-message.interface";
import { SendOTP } from "src/shared/interfaces/send-otp.interface";
import { VerifyOTP } from "src/shared/interfaces/verify-otp.interface";

@Controller()
export class SMSController {
  constructor(private smsService: SMSService) {}

  @EventPattern(EventListeningSubjects.SEND_OTP)
  async sendOTP({ value }: IncomingMessage<SendOTP>) {
    return this.smsService.sendOTP(value);
  }

  @EventPattern(EventListeningSubjects.SEND_MESSAGE)
  async sendSMS({
    value: { from, sendTo, message },
  }: IncomingMessage<SendMessage>) {
    return this.smsService.sendMessage(from, sendTo, message);
  }

  @EventPattern(EventListeningSubjects.VERIFY_OTP)
  async verifyOTP({ value: { phoneNumber, OTP } }: IncomingMessage<VerifyOTP>) {
    return this.smsService.verifyOTP(phoneNumber, OTP);
  }
}
