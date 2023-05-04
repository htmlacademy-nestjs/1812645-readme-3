import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { MaxLength } from 'class-validator';
import { LINK_POST_DESCRIPTION_NOT_VALID } from '../../publication.constant';

export class LinkPostDto {
  @ApiProperty({
    description: 'Link',
    example: 'https://www.youtube.com/watch?v=QdCyTTid9-U'
  })
  @Expose()
  link: string;

  @ApiProperty({
    description: 'Link Description',
    example: 'This is a link to a video lesson on algorithms.'
  })
  @Expose()
  @MaxLength(300, { message: LINK_POST_DESCRIPTION_NOT_VALID })
  description?: string;
}
