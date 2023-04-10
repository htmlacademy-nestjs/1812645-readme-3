import { Module } from '@nestjs/common';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { PublicationMemoryRepository } from './publication-memory.repository';

@Module({
  imports: [],
  controllers: [PublicationController],
  providers: [PublicationService, PublicationMemoryRepository],
})
export class BlogModule {}
