import { IVideoPost, ITextPost, IQuotePost, IPhotoPost, ILinkPost } from './post-interfaces/index';

export type PostsTypes =
    IVideoPost
  | ITextPost
  | IQuotePost
  | IPhotoPost
  | ILinkPost;
