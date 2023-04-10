import { IVideoPost } from '@project/shared/shared-types';

export class VideoPostEntity implements IVideoPost {
  public name: string;
  public linkToVideo: string;

  constructor(post: IVideoPost) {
    this.name = post.name;
    this.linkToVideo = post.linkToVideo;
  }
}
