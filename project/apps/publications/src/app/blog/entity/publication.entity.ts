import dayjs from 'dayjs';
import { IPublication, PostsTypes, PublicationStatus } from '@project/shared/shared-types';
import { PostFactory } from '../post.factory';

export class PublicationEntity implements IPublication {
  public _id?: string;
  public authorId: string;
  public dateOfCreation: Date;
  public dateOfPublication: Date;
  public status: PublicationStatus;
  public kindOfPost: string;
  public post: PostsTypes;
  public tags?: string[];

  constructor(publication: IPublication) {
    const {kindOfPost, post} = publication;

    const newPost = PostFactory.createPost(kindOfPost, post);

    this._id = publication._id;
    this.authorId = publication.authorId;
    this.status = publication.status;
    this.kindOfPost = publication.kindOfPost;
    this.post = newPost;
    this.tags = publication.tags;
  }

  public setDateOfCreation() {
    this.dateOfCreation = dayjs().toDate();

    return this;
  }

  public setDateOfPublication() {
    if(this.status === PublicationStatus.Published) {
      this.dateOfPublication = dayjs().toDate();
    } else {
      this.dateOfPublication = null;
    }

    return this;
  }

  public setStatus(status: string) {
    if(status === PublicationStatus.Published) {
      this.status = PublicationStatus.Published;
    } else {
      this.status = PublicationStatus.Draft;
    }

    return this;
  }
}
