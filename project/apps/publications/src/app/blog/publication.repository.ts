import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PublicationEntity } from './entity/publication.entity';
import { IPublication, PostsTypes } from '@project/shared/shared-types';

@Injectable()
export class PublicationRepository implements CRUDRepository<PublicationEntity, number, IPublication> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: PublicationEntity): Promise<IPublication> {
    console.log('* Repo', item);
    const {posts, ...pub} = item;

    const rez = await this.prisma.publications.create({
      data: {
        ...pub,
        posts: {
          create: {
            videoPosts: {
              
            }
          }
        }
      },
    });

    console.log('* Repo rez *', rez);

    return rez;
  }

  public async findById(id: number): Promise<IPublication> | null {
    const publication = await this.prisma.publications.findFirst({
      where: { id },
      include: {
        posts: {
          // TODO Если сразу сделать отбор из базы, то не будет этой портянки
          include: {
            videoPosts: true,
            textPosts: true,
            quotePosts: true,
            photoPosts: true,
            linkPosts: true
          }
        },
      },
    });

    console.log('* Repo', publication);

    return publication? preparePublicationWithOnePost(publication) : null;
  }

  public update(id: number, item: PublicationEntity): Promise<IPublication> {
    throw new Error('Method not implemented.');
  }

  public async destroy(id: number): Promise<void> {
    const deletePublication = await this.prisma.publications.delete({
      where: { id }
    });

    console.log('* Repo Delete ', deletePublication);
  }
}

const selectNonZeroPost = (posts) => {
  let obj: PostsTypes;
  Object.keys(posts).forEach(key => posts[key] && (obj = posts[key]));

  return obj;
}

const preparePublicationWithOnePost = (fullPublication) => {
  return {
    "id": fullPublication.id,
    "authorId": fullPublication.authorId,
    "dateOfCreation": fullPublication.dateOfCreation,
    "dateOfPublication": fullPublication.dateOfPublication,
    "status": fullPublication.status,
    "kindId": fullPublication.kindId,
    "postId": fullPublication.postId,
    "tags": fullPublication.tags,
    "posts": selectNonZeroPost(fullPublication.posts),
  }
}
