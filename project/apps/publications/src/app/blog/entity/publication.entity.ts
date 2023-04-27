import dayjs from 'dayjs';
import { IPublication, PostsTypes, PublicationStatus } from '@project/shared/shared-types';
import { PostFactory } from '../post.factory';
import { IEntity } from '@project/util/util-types';

export class PublicationEntity implements IEntity<PublicationEntity>, IPublication {
  public _id?: string;
  public authorId: string;
  public dateOfCreation: Date;
  public dateOfPublication: Date;
  public status: string;
  public kindId: number;
  public post: PostsTypes;
  public tags?: string[];

  constructor(publication: IPublication) {
    const {kindId, post} = publication;

    const newPost = PostFactory.createPost(kindId, post);

    this._id = publication._id;
    this.authorId = publication.authorId;
    this.status = publication.status;
    this.kindId = publication.kindId;
    this.post = newPost;
    this.tags = publication.tags;
  }

  toObject(): PublicationEntity {
    return { ...this };
  }

  fillEntity(publication: IPublication): void {
    const {kindId, post} = publication;

    const newPost = PostFactory.createPost(kindId, post);

    this._id = publication._id;
    this.authorId = publication.authorId;
    this.status = publication.status;
    this.kindId = publication.kindId;
    this.post = newPost;
    this.tags = publication.tags;
  }

  public setDateOfCreation() {
    this.dateOfCreation = dayjs().toDate();

    return this;
  }

  public setDateOfPublication() {
    if(this.status === PublicationStatus.PUBLISHED) {
      this.dateOfPublication = dayjs().toDate();
    } else {
      this.dateOfPublication = null;
    }

    return this;
  }

  public setStatus(status: string) {
    if(status === PublicationStatus.PUBLISHED) {
      this.status = PublicationStatus.PUBLISHED;
    } else {
      this.status = PublicationStatus.DRAFT;
    }

    return this;
  }
}
