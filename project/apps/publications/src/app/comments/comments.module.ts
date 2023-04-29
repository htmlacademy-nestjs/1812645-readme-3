import { Module } from '@nestjs/common';
import { CommentController } from './comments.controller';
import { CommentRepository } from './comments.repository';
import { CommentService } from './comments.service';

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [CommentRepository, CommentService],
  exports: [CommentRepository]
})
export class CommentsModule {}
