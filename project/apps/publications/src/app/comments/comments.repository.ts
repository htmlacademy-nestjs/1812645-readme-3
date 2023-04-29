import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { IComment } from '@project/shared/shared-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(publicationId: number, item: CommentEntity): Promise<IComment> {
    return this.prisma.comments.create({
      data: {
        ...item.toObject(),
        publicationId,
      },
    });
  }

  public async findById(id: number): Promise<IComment> {
    return this.prisma.comments.findFirst ({
      where: { id }
    });
  }

  public async findCommentsOfPublication(publicationId: number): Promise<IComment[]> {
    return this.prisma.comments.findMany ({
      where: { publicationId }
    });
  }

  public async update(id: number, item: CommentEntity): Promise<IComment> {
    return this.prisma.comments.update({
      where: { id },
      data: { ...item.toObject() }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.comments.delete({
      where: { id }
    });
  }
}

