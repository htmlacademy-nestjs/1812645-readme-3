import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { TagsModule } from './tags/tags.module';
import { NotifyModule } from './notify/notify.module';
import { ConfigPublicationsModule } from '@project/config/config-publications';

@Module({
  imports: [
    ConfigPublicationsModule,
    PrismaModule,
    BlogModule,
    CommentsModule,
    LikesModule,
    TagsModule,
    NotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
