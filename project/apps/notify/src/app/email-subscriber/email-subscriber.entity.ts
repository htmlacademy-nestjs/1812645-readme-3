import { IEntity } from '@project/util/util-types';
import { ISubscriber } from '@project/shared/shared-types';

export class EmailSubscriberEntity implements IEntity<EmailSubscriberEntity>, ISubscriber {
  public userId: string;
  public email: string;
  public name: string;
  public subscribeToPublications: boolean;

  constructor(emailSubscriber: ISubscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.userId = entity.userId ?? '';
    this.email = entity.email;
    this.name = entity.name;
    this.subscribeToPublications = entity.subscribeToPublications;
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
