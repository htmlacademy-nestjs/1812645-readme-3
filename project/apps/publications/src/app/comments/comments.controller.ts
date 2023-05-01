import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comments.service';
import { fillObject } from '@project/util/util-core';
import { CommentRdo } from './rdo/comment.rdo';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/post/:id')
  async create(@Param('id') idPublication: number, @Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.createComment(idPublication, dto);
    return fillObject(CommentRdo, newComment);
  }

  @Get('/:id')
  async read(@Param('id') id: number) {
    const comment = await this.commentService.getComment(id);
    return fillObject(CommentRdo, comment);
  }

  @Get('/post/:id')
  async readAllCommentsOfPublication(@Param('id') publicationId: number) {
    const comments = await this.commentService.getCommentsOfPublicationId(publicationId);
    return fillObject(CommentRdo, comments);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateCommentDto) {
    const comment = await this.commentService.updateComment(id, dto);
    return fillObject(CommentRdo, comment);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.commentService.deleteComment(id);
  }
}
