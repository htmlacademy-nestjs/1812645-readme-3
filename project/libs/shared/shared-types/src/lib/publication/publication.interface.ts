import { IComment, ILike, ITag, PostsTypes } from '@project/shared/shared-types';

export type IPublication = {
  _id?: string;
  authorId: string;
  dateOfCreation?: Date;
  dateOfPublication?: Date;
  status: string;
  kindId: number,
  post: PostsTypes,
  tags?: ITag[];
  comments?: IComment[];
  likes?: ILike[];
}
