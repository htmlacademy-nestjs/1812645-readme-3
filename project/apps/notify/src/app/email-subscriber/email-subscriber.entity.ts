import { IEntity } from '@project/util/util-types';
import { ISubscriber } from '@project/shared/shared-types';

export class EmailSubscriberEntity implements IEntity<EmailSubscriberEntity>, ISubscriber {
  public id: string;
  public email: string;
  public name: string;
  public userId: string;

  constructor(emailSubscriber: ISubscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.email = entity.email;
    this.name = entity.name;
    this.id = entity.id ?? '';
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
