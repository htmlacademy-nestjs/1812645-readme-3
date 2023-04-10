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
    example: 'published'
  })
  public status: PublicationStatus;

  @ApiProperty({
    description: 'Type of publication.',
    example: '123'
  })
  public kindOfPost: string;

  @ApiProperty({
    description: 'Type of publication. There are five possible types of publications.',
    example: 'video'
  })
  public post: PostDtoType;

  @ApiProperty({
    description: 'The tag for publication. The maximum number of tags is 8 pieces.',
    example: '["project", "design"]'
  })
  public tags?: string[];
}
