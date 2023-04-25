import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, BlogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
