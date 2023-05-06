import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ISubscriber } from '@project/shared/shared-types';

const SUBSCRIBERS_COLLECTION_NAME = 'email-subscribers';

@Schema({
  collection: SUBSCRIBERS_COLLECTION_NAME,
  timestamps: true,
})
export class EmailSubscriberModel extends Document implements  ISubscriber {
  @Prop()
  public userId: string;

  @Prop()
  public email: string;

  @Prop()
  public name: string;

  @Prop()
  public subscribeToPublications: boolean;
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);
