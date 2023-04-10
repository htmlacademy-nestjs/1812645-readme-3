import { Body, Controller, Post } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationDto } from './dto/publication.dto';

@Controller('publication')
export class PublicationController {
  constructor(private readonly postService: PublicationService) {}

  @Post()
  public async create(@Body() dto: PublicationDto) {
    const newPost = await this.postService.create(dto);

    return newPost;
  }
}
