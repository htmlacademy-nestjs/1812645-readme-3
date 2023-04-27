import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PublicationEntity } from './entity/publication.entity';
import { Publications } from '@prisma/client';

@Injectable()
export class PublicationRepository implements CRUDRepository<PublicationEntity, number, Publications> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: PublicationEntity): Promise<Publications> | null {
    const {post, ...base} = item;

    const publication = await this.prisma.publications.create({
      data: {
        ...base,
        post: { ...post },
        comments: {},
      }
    });
    return publication;
  }

  public async findById(id: number): Promise<Publications> | null {
    const publication = await this.prisma.publications.findFirst({
      where: { id },
      include: {
        comments: true
      }
    });
    return publication;
  }

  public async find(): Promise<Publications[]> {
    return await this.prisma.publications.findMany({
      include: {
        comments: true
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
