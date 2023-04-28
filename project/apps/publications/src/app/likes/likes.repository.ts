import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ILike } from '@project/shared/shared-types';
import { LikeEntity } from './like.entity';

@Injectable()
export class LikesRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(publicationId: number, entity: LikeEntity): Promise<ILike> {
    return this.prisma.likes.create({
      data: { ...entity.toObject(), publicationId }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.likes.delete({
      where: { id }
    })
  }
}
