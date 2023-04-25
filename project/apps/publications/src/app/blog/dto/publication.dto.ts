import { ApiProperty } from '@nestjs/swagger';
import { PublicationStatus } from '@project/shared/shared-types';
import { PostDtoType } from './post-dto.type';

export class PublicationDto {
  @ApiProperty({
    description: '',
    example: '123'
  })
  public authorId: string;

  @ApiProperty({
    description: 'Status of publication. Published or draft',
    enum: PublicationStatus,
    example: PublicationStatus.Draft
  })
  public status: PublicationStatus;

  @ApiProperty({
    description: 'Type of publication. There are five possible types of publications: video, text, quote, photo, link',
    example: 'video'
  })
  public kindId: number;

  @ApiProperty({
    description: 'The publication itself.',
    example: '"post": {"link": "Link to super salt.","description": "This is Super!"},'
  })
  public posts: PostDtoType;

  @ApiProperty({
    description: 'The tag for publication. The maximum number of tags is 8 pieces.',
    example: '["project", "design"]'
  })
  public tags?: string[];
}
