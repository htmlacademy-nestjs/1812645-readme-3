import { ISubscriber } from '@project/shared/shared-types';
import { Injectable } from '@nestjs/common';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT, SUBSCRIBER_CHANGE } from './mail.constant';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewSubscriber(subscriber: ISubscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`,
      }
    });
  }

  public async sendNotifyChangeSubscriber(subscriber: ISubscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: SUBSCRIBER_CHANGE,
      template: './change-subscriber',
      context: {
        user: `${subscriber.name}`,
      }
    });
  }
}
