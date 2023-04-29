import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { fillObject } from '@project/util/util-core';
import { TagRdo } from './rdo/tag.rdo';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post('/')
  async create(@Body() dto: CreateTagDto) {
    const newTags = await this.tagsService.createTag(dto);
    return fillObject(TagRdo, newTags);
  }

  @Get('/:id')
  async read(@Param('id', ParseIntPipe) id: number) {
    const tag = this.tagsService.getTag(id);
    return fillObject(TagRdo, tag);
  }

  @Get('/post/:id')
  async readTagsOfPublication(@Param('id', ParseIntPipe) publicationId: number) {
    return this.tagsService.getTagsOfPublicationId(publicationId);
  }

  @Get('/')
  async readTags() {
    return this.tagsService.getTags();
  }

  @Patch('/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: TagRdo) {
    return this.tagsService.updateTag(id, dto);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.deleteTag(id);
  }
}
