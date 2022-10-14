import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
const otpGenerator = require("otp-generator");
import * as bcrypt from "bcrypt";
import * as moment from "moment";
import {
  ERROR_MESSAGES,
  INFO_MESSAGE,
  SUCCESS_MESSAGE,
} from "../constant.json";
import { VonageService } from "./vonage.service";
import { SMSDetails, SMSDetailsDocument } from "src/db/schemas/sms.schema";
import { ClientKafka } from "@nestjs/microservices";
import { EventEmittingSubjects } from "src/shared/enums/event-emit-subjects";
import { SendOTP } from "src/shared/interfaces/send-otp.interface";

@Injectable()
export class SMSService {
  constructor(
    @InjectModel(SMSDetails.name)
    private readonly smsModel: Model<SMSDetailsDocument>,
    private readonly configService: ConfigService,
    private readonly messagingService: VonageService,
    @Inject("KAFKA_SERVICE") private natsServerClient: ClientKafka
  ) {}

  async sendMessage(
    from: string,
    sendTo: string,
    message: string
  ): Promise<any> {
    if (!sendTo) {
      return ERROR_MESSAGES.CHECK_PHONE_NUMBER;
    }
    return await this.messagingService.sendingSMS(from, sendTo, message);
  }

  async generateExpirationTime() {
    const expiresIn = moment()
      .add(this.configService.get("EXPIRY_MINUTES"), "minutes")
      .format();
    return expiresIn;
  }
  async generateOTP(): Promise<String> {
    return otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
  }

  async saveOTPDetails(mobileNumber, hashedOtp, expiryTime, responseData) {
    const saveOtp = new this.smsModel({
      mobileNumber,
      otp: hashedOtp,
      expiryTime,
      messageSentResponse: JSON.stringify(responseData),
    });
    return saveOtp.save();
  }

  async sendOTP({
    phoneNumber,
    userId,
    otp,
    expiryTime,
    hashedOtp,
    expiryInMinutes,
  }: SendOTP): Promise<any> {
    const message = `${otp} ${INFO_MESSAGE.OTP_CODE_MESSAGE} ${expiryInMinutes} minutes`;
    const sendingSMS = await this.sendMessage(
      this.configService.get("YOUR_VIRTUAL_NUMBER"),
      phoneNumber,
      message
    );
    if (sendingSMS.status === SUCCESS_MESSAGE.SUCCESS) {
      this.natsServerClient.emit<string>(EventEmittingSubjects.SAVE_OTP_EVENT, {
        userId,
        smsStatus: sendingSMS.status,
      });
      await this.saveOTPDetails(
        phoneNumber,
        hashedOtp,
        expiryTime,
        sendingSMS.response
      );
      return SUCCESS_MESSAGE.SENT_OTP_SUCCESSFULLY;
    } else {
      this.natsServerClient.emit<string>(EventEmittingSubjects.SAVE_OTP_EVENT, {
        userId,
        smsStatus: sendingSMS.status,
      });
      throw new Error(sendingSMS.status);
    }
  }

  async verifyOTP(mobileNumber, otp): Promise<String> {
    let otpHolder = await this.smsModel
      .findOne({ mobileNumber })
      .sort({ createdAt: -1 });
    if (otpHolder.otp != null) {
      if (otpHolder.otpVerified != true) {
        if (moment().isBefore(otpHolder.expiryTime)) {
          const validateOTP = await bcrypt.compare(otp, otpHolder.otp);
          if (validateOTP) {
            return SUCCESS_MESSAGE.OTP_VERIFY_SUCCESS;
            //...
          } else {
            return ERROR_MESSAGES.OTP_VERIFY_FAIL;
          }
        } else {
          return ERROR_MESSAGES.OTP_VERIFY_FAILED;
        }
      } else {
        return ERROR_MESSAGES.OTP_VERIFY_FAIL;
      }
    } else {
      return ERROR_MESSAGES.OTP_VERIFY_FAIL;
    }
  }
}
