import { Module } from '@nestjs/common';
import { PublicationsController } from './publications.controller';
import { UsersController } from './users.controller';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PublicationsController,
    UsersController,
  ],
})
export class AppModule {}
