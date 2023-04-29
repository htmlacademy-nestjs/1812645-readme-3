import { IComment, PostsTypes } from '@project/shared/shared-types';
import { Expose } from 'class-transformer';

export class PublicationRdo {
  @Expose()
  public id: number;

  @Expose()
  public authorId: string;

  @Expose()
  public dateOfCreation: Date;

  @Expose()
  public dateOfPublication: Date;

  @Expose()
  public status: string;

  @Expose()
  public kindId: string;

  @Expose()
  public tags: [];

  @Expose()
  public post: PostsTypes

  @Expose()
  public comments: IComment[]
}
