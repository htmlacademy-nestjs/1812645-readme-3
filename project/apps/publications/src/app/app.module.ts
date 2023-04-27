import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [PrismaModule, BlogModule, CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
