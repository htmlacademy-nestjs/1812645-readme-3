import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likeService: LikesService) {}

  @Post('/post/:id')
  async create(@Param('id') publicationId: number, @Body() dto: CreateLikeDto) {
    return this.likeService.createLike(publicationId, dto)
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.likeService.deleteLike(id);
  }
}
