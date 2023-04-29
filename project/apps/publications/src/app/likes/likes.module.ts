import { Module } from '@nestjs/common';
import { LikesRepository } from './likes.repository';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';

@Module({
  imports: [],
  controllers: [LikesController],
  providers: [LikesRepository, LikesService],
  exports: [LikesRepository]
})
export class LikesModule {}
