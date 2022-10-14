import ContactService from './contact.service';
import SubscriberService from './subscriber.service';
import JtenochService from './jtenoch.service';
import MailerService from './mailer.service';
import { TasksService } from './tasks.service';

export const services = [
  ContactService,
  MailerService,
  TasksService,
  JtenochService,
  SubscriberService
];
