import { IPhotoPost } from '@project/shared/shared-types';

export class PhotoPostEntity implements IPhotoPost {
  linkToPhoto: string;

  constructor(post: IPhotoPost) {
    this.linkToPhoto = post.linkToPhoto;
  }
}
