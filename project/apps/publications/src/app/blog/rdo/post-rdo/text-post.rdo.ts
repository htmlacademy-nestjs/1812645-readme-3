import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TextPostRdo {
  @ApiProperty({ description: 'Name of text post' })
  @Expose()
  name: string;

  @ApiProperty({ description: 'Announcement of text post' })
  @Expose()
  announcement: string;

  @ApiProperty({ description: 'Text' })
  @Expose()
  text: string;
}
