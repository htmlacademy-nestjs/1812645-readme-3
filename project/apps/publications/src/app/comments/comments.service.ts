import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comments.repository';
import { IComment } from '@project/shared/shared-types';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(publicationId: number, dto: CreateCommentDto): Promise<IComment> {
    const commentEntity = new CommentEntity(dto);
    return this.commentRepository.create(publicationId, commentEntity);
  }

  async getComment(id: number): Promise<IComment> {
    return this.commentRepository.findById(id);
  }

  async getCommentsOfPublicationId(publicationId: number): Promise<IComment[]> {
    return this.commentRepository.findCommentsOfPublication(publicationId);
  }

  async updateComment(id: number, dto: UpdateCommentDto): Promise<IComment> {
    return this.commentRepository.update(id, new CommentEntity(dto));
  }

  async deleteComment(id: number): Promise<void> {
    return this.commentRepository.destroy(id);
  }
}
