import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { IPublication, RabbitRouting } from '@project/shared/shared-types';
import { MailService } from '../mail/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notify-1',
    createQueueIfNotExists: true
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.UpdateSubscriber,
    queue: 'readme.notify-2',
    createQueueIfNotExists: true
  })
  public async update(subscriber: CreateSubscriberDto) {
    this.subscriberService.updateSubscriber(subscriber);
    this.mailService.sendNotifyChangeSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.mailingNewPublications,
    queue: 'readme.notify-3',
    createQueueIfNotExists: true
  })
  public async mailingNewPublications(publications: IPublication[]) {
    const subscribers = await this.subscriberService.getSubscribersOnNewPublications();
    await this.mailService.sendNotifyNewPublications(subscribers, publications);
  }
}
