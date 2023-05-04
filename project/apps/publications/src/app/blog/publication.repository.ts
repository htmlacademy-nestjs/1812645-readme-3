import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PublicationEntity } from './entity/publication.entity';
import { Publications } from '@prisma/client';
import { PublicationQuery } from './query/publication-query';

@Injectable()
export class PublicationRepository implements CRUDRepository<PublicationEntity, number, Publications> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: PublicationEntity): Promise<Publications> | null {
    const {post, tags, comments, likes, ...base} = item;

    return await this.prisma.publications.create({
      data: {
        ...base,
        post: { ...post },
        tags: {
          connectOrCreate: prepareTags(tags)
        },
      },
      include: {
        tags: true
      }
    });
  }

  public async findById(id: number): Promise<Publications> | null {
    return await this.prisma.publications.findFirst({
      where: { id },
      include: {
        tags: true,
        comments: true,
        likes: true
      }
    });
  }

  public async find({limit, tags, sortDirection, page}: PublicationQuery): Promise<Publications[]> {
    return await this.prisma.publications.findMany({
      where:{
        tags: {
          some: {
            title: {
              in: tags
            }
          }
        }
      },
      take: limit,
      include: {
        tags: true,
        comments: true,
        likes: true
      },
      orderBy: [
        { dateOfCreation: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public update(id: number, item: PublicationEntity): Promise<Publications> {
    return Promise.resolve(undefined);
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.publications.delete({
      where: { id }
    });
  }
}

const prepareTags = (tags) => {
  const arr = tags.map((tag) => ({
    create: {title: tag.title},
    where: {title: tag.title}
    }
  ));
  return arr;
}
