import { Module } from '@nestjs/common';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { PublicationRepository } from './publication.repository';

@Module({
  imports: [],
  controllers: [PublicationController],
  providers: [PublicationService, PublicationRepository],
})
export class BlogModule {}
