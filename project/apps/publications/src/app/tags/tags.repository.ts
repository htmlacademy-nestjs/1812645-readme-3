import { CRUDRepository } from '@project/util/util-types';
import { TagEntity } from './tags.entity';
import { ITag } from '@project/shared/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsRepository implements CRUDRepository<TagEntity, number, ITag> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TagEntity): Promise<ITag> {
    return await this.prisma.tags.create({
      /*
      data: {
        title: 'Выхухоль'
      }
      */
      data: { ...item.toObject() }
    });
  }

  public async findById(id: number): Promise<ITag> {
    return this.prisma.tags.findFirst({
      where: { id }
    });
  }

  public async findTagsOfPublicationId(publicationId: number): Promise<ITag[]> {
    return this.prisma.tags.findMany({
      where: {
        publication: {
          some: { id: publicationId }
        }
      }
    });
  }

  public async findTags(): Promise<ITag[]> {
    return this.prisma.tags.findMany();
  }

  public async update(id: number, item: TagEntity): Promise<ITag> {
    return this.prisma.tags.update({
      where: { id },
      data: { ...item.toObject() }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.tags.delete({
      where: { id }
    });
  }
}
