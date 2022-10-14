import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const Vonage = require('@vonage/server-sdk');
import { SUCCESS_MESSAGE } from '../constant.json';

@Injectable()
export class VonageService {
  vonage: any;
  constructor(private readonly configService: ConfigService) {
    this.vonage = new Vonage({
      apiKey: this.configService.get('VONAGE_API_KEY'),
      apiSecret: this.configService.get('VONAGE_API_SECRETE_KEY'),
    });
  }

  async sendingSMS(from, sendTo, message) {
    return new Promise((resolve, reject) => {
      this.vonage.message.sendSms(
        from,
        sendTo,
        message,
        (err, responseData) => {
          if (err) {
            reject({
              status: responseData.messages[0]['error-text'],
              response: responseData,
            });
          } else {
            if (responseData.messages[0]['status'] === '0') {
              resolve({
                status: SUCCESS_MESSAGE.SUCCESS,
                response: responseData,
              });
            } else {
              reject({
                status: responseData.messages[0]['error-text'],
                response: responseData,
              });
            }
          }
        },
      );
    });
  }
}
