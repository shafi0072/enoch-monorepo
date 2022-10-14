import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import MailerService from './mailer.service';
import SubscriberService from './subscriber.service';
import JtenochService from './jtenoch.service';

@Injectable()
export class TasksService {
  constructor(private mailerService: MailerService, private subscriberService: SubscriberService, private jtenochService: JtenochService ){

  }
  private readonly logger = new Logger(TasksService.name);
  
  @Cron('0 10 * * * *')
  //@Cron('45 * * * * *')
  async handleCron() {
    const emailData = await this.subscriberService.getSubscriberUnsentList();
    const res = await this.mailerService.addMailList(emailData);
    
    emailData.forEach((item) => {
      this.subscriberService.updateUnsent(item.email); 
    });
    const emailData1 = await this.jtenochService.getJtenochUnsentList();
    const res1 = await this.mailerService.addMailList(emailData1);
    
    emailData1.forEach((item) => {
      this.jtenochService.updateUnsent(item.email); 
    });
    this.logger.debug('every hour, at the start of the 10th minute');

  }
}