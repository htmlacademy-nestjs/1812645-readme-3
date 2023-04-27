import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { fillObject } from '@project/util/util-core';
import { PublicationRdo } from './rdo/publication.rdo';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post('/')
  async create(@Body() dto: CreatePublicationDto) {
    return await this.publicationService.createPublication(dto);
  }

  @Get('/:id')
  async read(@Param('id', ParseIntPipe) id: number) {
    const post = await this.publicationService.getPublication(id);
    return {...post};
  }

  @Get('/')
  async index() {
    const posts = await this.publicationService.getPublications();
    return fillObject(PublicationRdo, posts);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdatePublicationDto) {
    const updatedPost = await this.publicationService.updatePublication(id, dto);
    return fillObject(PublicationRdo, updatedPost)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', ParseIntPipe) id: number) {
    return this.publicationService.deletePublication(id);
  }
}
