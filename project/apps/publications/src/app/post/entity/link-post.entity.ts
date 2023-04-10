import { ILinkPost } from '@project/shared/shared-types';

export class LinkPostEntity implements ILinkPost {
  public link: string;
  public description?: string;

  constructor(post: ILinkPost) {
    this.link = post.link;
    this.description = post.description;
  }
}
