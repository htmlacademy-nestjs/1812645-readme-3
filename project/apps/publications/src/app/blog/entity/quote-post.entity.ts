import { IQuotePost } from '@project/shared/shared-types';

export class QuotePostEntity implements IQuotePost {
  public text: string;
  public authorOfQuoteId: string;

  constructor(post: IQuotePost) {
    this.text = post.text;
    this.authorOfQuoteId = post.authorOfQuoteId;
  }
}
