import { ITextPost } from '@project/shared/shared-types';

export class TextPostEntity implements ITextPost {
  name: string;
  announcement: string;
  text: string;

  constructor(post: ITextPost) {
    this.name = post.name;
    this.announcement = post.announcement;
    this.text = post.text;
  }
}
