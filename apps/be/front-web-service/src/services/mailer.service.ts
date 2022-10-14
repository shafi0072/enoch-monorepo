import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
    ERROR_MESSAGES,
    SUCCESS_MESSAGE,
    CONSTANT_VARIABLE,
    URLS,
    APIKEYS,
  } from '../constant.json';

  @Injectable()
  export default class MailerService {
  constructor(private readonly httpService: HttpService) {}
  
  async addMailList(user_email){
    if(user_email){
        return this.callApi(user_email);
    }else{
        return ERROR_MESSAGES.ALREADY_VERIFIED;
    }
  }

  async callApi(user_email){
    
    const request = require('request');

    const options = {
    method: 'POST',
    url: URLS.MAILERLITE,//'https://api.mailerlite.com/api/v2/groups/66398652623488981/subscribers/import',
    headers: {
        accept: 'application/json',
        'X-MailerLite-ApiDocs': 'true',
        'content-type': 'application/json',
        'X-MailerLite-ApiKey': APIKEYS.X_MAILERLITE_APIKEY
    },
    body: {
        subscribers: user_email,
        resubscribe: false,
        autoresponders: false,
        return_status: false
    },
    json: true
    };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    });
  }
  
}
