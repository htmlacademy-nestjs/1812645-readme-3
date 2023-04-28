import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comments.service';
import { fillObject } from '@project/util/util-core';
import { CommentRdo } from './rdo/comment.rdo';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/post/:id')
  async create(@Param('id', ParseIntPipe) idPublication: number, @Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.createComment(idPublication, dto);
    return fillObject(CommentRdo, newComment);
  }

  @Get('/:id')
  async read(@Param('id', ParseIntPipe) id: number) {
    const comment = this.commentService.getComment(id);
    return fillObject(CommentRdo, comment);
  }

  @Get('/post/:id')
  async readAll(@Param('id', ParseIntPipe) publicationId: number) {
    const comments = await this.commentService.getComments(publicationId);
    return fillObject(CommentRdo, comments);
  }

  @Patch('/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCommentDto) {
    console.log("* Patch Controller *", dto);
    const comment = await this.commentService.updateComment(id, dto);
    return fillObject(CommentRdo, comment);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.deleteComment(id);
  }
}
