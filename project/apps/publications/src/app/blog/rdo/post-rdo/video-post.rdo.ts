import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class VideoPostRdo {
  @ApiProperty({ description: 'Name of video' })
  @Expose()
  public name: string;

  @ApiProperty({ description: 'Link to video' })
  @Expose()
  public linkToVideo: string;
}
