import { ILike } from '@project/shared/shared-types';

export class LikeEntity implements ILike {
  id: number
  userId: string;
  publicationId: number;

  constructor(entity: ILike) {
    this.id = entity.id;
    this.publicationId = entity.publicationId;
    this.userId = entity.userId;
  }

  public toObject() {
    return {...this}
  }
}
