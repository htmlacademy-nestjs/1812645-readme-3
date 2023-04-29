import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [PrismaModule, BlogModule, CommentsModule, LikesModule, TagsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
