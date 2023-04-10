import { PostsTypes, PublicationStatus } from '@project/shared/shared-types';

export type IPublication = {
  _id?: string;
  authorId: string;
  dateOfCreation?: Date;
  dateOfPublication?: Date;
  status: PublicationStatus;
  kindOfPost: string,
  post: PostsTypes,
  tags?: string[];
}
