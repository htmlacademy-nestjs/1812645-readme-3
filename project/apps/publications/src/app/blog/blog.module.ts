import { Module } from '@nestjs/common';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { PublicationRepository } from './publication.repository';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [NotifyModule,],
  controllers: [PublicationController],
  providers: [
    PublicationService,
    PublicationRepository
  ],
})
export class BlogModule {}
