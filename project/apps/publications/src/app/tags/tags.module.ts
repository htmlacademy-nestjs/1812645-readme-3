import { Module } from '@nestjs/common';
import { TagsRepository } from './tags.repository';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';

@Module({
  imports: [],
  controllers: [TagsController],
  providers: [TagsRepository, TagsService],
  exports: [TagsRepository]
})
export class TagsModule {}
