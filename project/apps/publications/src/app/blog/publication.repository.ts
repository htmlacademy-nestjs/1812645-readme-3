import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PublicationEntity } from './entity/publication.entity';
import { Publications } from '@prisma/client';

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

  public async find(): Promise<Publications[]> {
    return await this.prisma.publications.findMany({
      include: {
        tags: true,
        comments: true,
        likes: true
      }
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
