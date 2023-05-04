import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { VIDEO_POST_NAME_NOT_VALID } from '../../publication.constant';
import { Expose } from 'class-transformer';

export class VideoPostDto {
  @ApiProperty({
    description: 'Video name',
    example: 'Mapping in JavaScript.'
  })
  @Expose()
  @IsString()
  @Length(20, 50, { message: VIDEO_POST_NAME_NOT_VALID })
  name: string;

  @ApiProperty({
    description: 'link to the video',
    example: 'https://www.youtube.com/watch?v=QdCyTTid9-U'
  })
  @Expose()
  linkToVideo: string;
}
