import { IComment, ILike, IPublication, ITag, PostsTypes, PublicationStatus } from '@project/shared/shared-types';
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
  public tags: ITag[];
  public comments: IComment[];
  public likes: ILike[];

  constructor(publication: IPublication) {
    const {kindId, post} = publication;

    const newPost = PostFactory.createPost(kindId, post);

    this._id = publication._id;
    this.authorId = publication.authorId;
    this.status = this.setStatus(publication.status);
    this.dateOfCreation = new Date();
    this.dateOfPublication = (this.status === PublicationStatus.PUBLISHED) ? new Date() : null;
    this.kindId = publication.kindId;
    this.post = newPost;
    this.tags = [ ...publication.tags ];
  }

  toObject(): PublicationEntity {
    return {
      ...this,
      post: { ...this.post },
      tags: [ ...this.tags ],
      comments: [ ...this.comments ],
      likes: [ ...this.likes ]
    };
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

  public setStatus(st: string) {
    let status = PublicationStatus.DRAFT;

    if(st === PublicationStatus.PUBLISHED) {
      status = PublicationStatus.PUBLISHED;
    }

    return status;
  }
}
