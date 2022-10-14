import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DBService from './db.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Contact, ContactDocument } from '../db/schemas/contact.schema';
import { ERROR_MESSAGES, CONSTANT_VARIABLE, URLS} from '../constant.json';
import { CategoryContact } from 'src/db/ENUMS/enums';


@Injectable()
export default class ContactService extends DBService<Contact> {
  prefix = 'cmnt';
  idField: string = 'contactID';
  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<ContactDocument>,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
    super(contactModel);
  }

  async addContact(contact){
    if(contact.isAgreedTermsAndConditions){
      try {
        const contactData = await this.contactModel.findOne({ email: contact.email }).select({ email: 1, _id: 0 });
        if(contactData){
          throw new BadRequestException(ERROR_MESSAGES.USER_ALREADY_EXISTS);
        }else{
          let typecat = CategoryContact.CREATORS;

          switch(contact.category){
            case CategoryContact.CREATORS : 
              typecat = CategoryContact.CREATORS;
            break;
            case CategoryContact.ARTISTS : 
              typecat = CategoryContact.ARTISTS;
            break;
            case CategoryContact.INVESTORS : 
              typecat = CategoryContact.INVESTORS;
            break;
            case CategoryContact.PARTNERS : 
              typecat = CategoryContact.PARTNERS;
            break;
          }
          const contactNew = await this.create({
            name: contact.name,
            email: contact.email,
            type: contact.type,
            country: contact.country,
            text: contact.text,
            know_about_us: contact.know_about_us,
            category: typecat
          });
          let body = {
            name: contact.name,
            email: contact.email,
            type: contact.type,
            country: contact.country,
            text: contact.text,
            know_about_us: contact.know_about_us,
            category: typecat
          };
          await this.sendEmail(contact.email, contact.name+" "+CONSTANT_VARIABLE.CONTACT_SUBJECT, JSON.stringify(body));      
          await this.sendEmailAdmin(CONSTANT_VARIABLE.ADMIN_CONTACT_EMAIL, contact.name+" "+CONSTANT_VARIABLE.ADMIN_CONTACT_SUBJECT, JSON.stringify(body));      
          return contactNew;
        }
      } catch (e) {
        throw new Error(ERROR_MESSAGES.USER_ALREADY_EXISTS);
        //return e.response;
      }
    }else{
      throw new Error(ERROR_MESSAGES.NOT_AGREED);
    }
    
  }

  async sendEmailAdmin(to: string, subject: string, body: string): Promise<any> {
    let dataBody = JSON.parse(body);

    return await this.mailerService
      .sendMail({
        to: to,
        from: this.configService.get<string>('EMAIL'),
        subject: subject,
        template: CONSTANT_VARIABLE.ADMIN_CONTACT_TEMPLATE,
        context: {
          name: dataBody.name,
          email: dataBody.email,
          type: dataBody.type,
          country: dataBody.country,
          text: dataBody.text,
          know_about_us: dataBody.know_about_us,
          category: dataBody.category

        }
      });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<any> {
    
    return await this.mailerService
      .sendMail({
        to: to,
        from: this.configService.get<string>('EMAIL'),
        subject: subject,
        template: CONSTANT_VARIABLE.CONTACT_TEMPLATE,
        context: {
          name: "Pankaj"
        }
      });
  }

}
