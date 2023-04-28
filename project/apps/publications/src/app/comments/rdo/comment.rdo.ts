import { Expose } from "class-transformer";

export class CommentRdo {
  @Expose()
  public id: number;

  @Expose()
  public createdAt: Date;

  @Expose()
  public updateAt: Date;

  @Expose()
  public publicationId: number;

  @Expose()
  public userId: string;

  @Expose()
  public text: string;
}
