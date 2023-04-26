import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationDto } from './dto/publication.dto';
// import { fillObject } from '@project/util/util-core';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post()
  public async create(@Body() dto: PublicationDto) {
    console.log('=== Controller Post ===');
    console.log('* Controller', dto);

    const newPublication = await this.publicationService.createPublication(dto);

    return newPublication;
  }

  @Get('/:id')
  async read(@Param('id', ParseIntPipe) id: number) {
    console.log('=== Controller Get ===', id);

    const post = await this.publicationService.getPublication(id);
    console.log('Get rez controller', post);

    return ({...post});
  }

  @Delete('/:id')
  async destroy(@Param('id', ParseIntPipe) id: number) {
    console.log('=== Controller Delete ===', id);

    this.publicationService.deletePublication(id);
  }
}
