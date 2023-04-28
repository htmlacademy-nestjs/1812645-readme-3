import { IComment } from '@project/shared/shared-types';
import { IEntity } from '@project/util/util-types';

export class CommentEntity implements IEntity<CommentEntity>, IComment {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public publicationId: number;
  public userId: string;
  public text: string;

  constructor(comment: IComment) {
    this.fillEntity(comment);
  }

  public toObject(): CommentEntity {
    return { ...this }
  }

  public fillEntity(entity: IComment) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.userId = entity.userId;
    this.text = entity.text;
  }
}
