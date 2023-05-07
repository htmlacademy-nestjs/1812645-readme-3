import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { fillObject } from '@project/util/util-core';
import { PublicationRdo } from './rdo/publication.rdo';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationQuery } from './query/publication-query';
import { TagsTransformToObjectArray } from '@project/shared/shared-pipes';
import { IPublication } from '@project/shared/shared-types';
import { NotifyService } from '../notify/notify.service';

@Controller('publication')
export class PublicationController {
  constructor(
    private readonly publicationService: PublicationService,
    private readonly notifyService: NotifyService,
  ) {}

  @Post('/')
  async create(@Body(TagsTransformToObjectArray) dto: IPublication) {
    return await this.publicationService.createPublication(dto);
  }

  @Get('/:id')
  async read(@Param('id') id: number) {
    const post = await this.publicationService.getPublication(id);
    return {...post};
  }

  @Get('/')
  async readAll(@Query() query: PublicationQuery) {
    const posts = await this.publicationService.getPublications(query);
    return fillObject(PublicationRdo, posts);
  }

  @Get('/mailing/:date')
  async mailingNewPublications(@Param() date: string) {
    const newPublications = await this.publicationService.getPublicationsForDate(date);
    await this.notifyService.mailingNewPublications (newPublications);
    return fillObject(PublicationRdo, newPublications);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdatePublicationDto) {
    const updatedPost = await this.publicationService.updatePublication(id, dto);
    return fillObject(PublicationRdo, updatedPost)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    return this.publicationService.deletePublication(id);
  }
}
