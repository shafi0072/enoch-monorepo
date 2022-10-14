import {
    Body,
    CACHE_MANAGER,
    Controller,
    Get,
    Inject,
    Post,
  } from '@nestjs/common';
  import {
    ClientProxy,
    MessagePattern,
    ClientKafka,
  } from '@nestjs/microservices';
  import ContactService from 'src/services/contact.service';
  import SubscriberService from 'src/services/subscriber.service';
  import JtenochService from 'src/services/jtenoch.service';
  import { CreateContactInput } from 'src/graphql/dto/create-contact.input';
  import { CreateSubscriberInput } from 'src/graphql/dto/create-subscriber.input';
  import { CreateJtenochInput } from 'src/graphql/dto/create-jtenoch.input';
  
  import { AppService } from './app.service';
  
  @Controller()
  export class AppController {
    constructor(private readonly contactService: ContactService, private readonly subscriberService: SubscriberService, private readonly jtenochService: JtenochService) {}
    @Get()
    getHello() {
      return 'Micro service is working!';
    }

    @Post('/contact-us')
    async contactUs(@Body() body: CreateContactInput) {
        const newContact = await this.contactService.addContact(body);
        return newContact;
    }

    @Post('/subscribe')
    async addSubscribe(@Body() body: CreateSubscriberInput) {
        const newSubscriber = await this.subscriberService.addSubscriber(body);
        return newSubscriber;
    }

    @Post('/jtenoch')
    async addJtenoch(@Body() body: CreateJtenochInput) {
        const newJtenoch = await this.jtenochService.addJtenoch(body);
        return newJtenoch;
    }
  
    async onApplicationBootstrap() {
      
    }
  }
  