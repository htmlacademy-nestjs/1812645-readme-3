import { IEntity } from '@project/util/util-types';
import { IToken } from '@project/shared/shared-types';

export class RefreshTokenEntity implements IEntity<RefreshTokenEntity>, IToken {
  public id: string;
  public createdAt: Date;
  public tokenId: string;
  public userId: string;
  public expiresIn: Date;

  constructor(refreshToken: IToken) {
    this.createdAt = new Date;
    this.fillEntity(refreshToken);
  }

  public fillEntity(entity: IToken): void {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.tokenId = entity.tokenId;
    this.userId = entity.userId;
    this.expiresIn = entity.expiresIn;
  }

  public toObject(): RefreshTokenEntity {
    return { ...this };
  }
}
