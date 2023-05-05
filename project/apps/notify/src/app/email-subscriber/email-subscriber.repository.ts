import { CRUDRepository } from '@project/util/util-types';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { ISubscriber } from '@project/shared/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EmailSubscriberModel } from './email-subscriber.model';
import { Model } from 'mongoose';

@Injectable()
export class EmailSubscriberRepository implements CRUDRepository<EmailSubscriberEntity, string, ISubscriber> {
  constructor(
    @InjectModel(EmailSubscriberModel.name) private readonly emailSubscriberModel: Model<EmailSubscriberModel>
  ) {}

  public async create(item: EmailSubscriberEntity): Promise<ISubscriber> {
    const newEmailSubscriber = new this.emailSubscriberModel(item);
    return newEmailSubscriber.save();
  }

  public async findById(id: string): Promise<ISubscriber | null> {
    return this.emailSubscriberModel
      .findOne({ _id: id })
      .exec();
  }

  public async findByEmail(email: string): Promise<ISubscriber | null> {
    return this.emailSubscriberModel
      .findOne({ email })
      .exec()
  }

  public async update(id: string, item: EmailSubscriberEntity): Promise<ISubscriber> {
    return this.emailSubscriberModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    this.emailSubscriberModel
      .deleteOne({ _id: id });
  }
}
