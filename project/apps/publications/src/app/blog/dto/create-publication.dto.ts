import { ApiProperty } from '@nestjs/swagger';
import { PostDtoType } from './post-dto.type';
import { PublicationStatus } from '@project/shared/shared-types';
import { Expose } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsString, MaxLength, MinLength } from 'class-validator';
import { PUBLICATION_TAGS_ARRAY_MAX, PUBLICATION_TAGS_IS_NOT_ARRAY, PUBLICATION_TAG_IS_STRING, PUBLICATION_TAG_MAX_LENGTH, PUBLICATION_TAG_MIN_LENGTH } from '../publication.constant';

export class CreatePublicationDto {
  @ApiProperty({
    description: 'id of the author of the publication',
    example: '4592'
  })
  @Expose()
  @IsString()
  public authorId: string;

  @ApiProperty({
    description: 'Status of publication. Published or draft',
    enum: PublicationStatus,
    example: PublicationStatus.DRAFT
  })
  @Expose()
  public status: PublicationStatus;

  @ApiProperty({
    description: 'Type of publication. There are five possible types of publications: video, text, quote, photo, link',
    example: 'video'
  })
  @Expose()
  public kindId: number;

  @ApiProperty({
    description: 'The publication itself.',
    example: '"post": {"link": "Link to super salt.","description": "This is Super!"},'
  })
  @Expose()
  public post: PostDtoType;

  @ApiProperty({
    description: 'The tag for publication. The maximum number of tags is 8 pieces.',
    example: '["project", "design"]'
  })
  @Expose()
  @IsArray({ message: PUBLICATION_TAGS_IS_NOT_ARRAY })
  @ArrayMaxSize(8, { message: PUBLICATION_TAGS_ARRAY_MAX })
  @MinLength(3, {
    each: true,
    message: PUBLICATION_TAG_MIN_LENGTH
  })
  @MaxLength(10, {
    each: true,
    message: PUBLICATION_TAG_MAX_LENGTH
  })
  @IsString({
    each: true,
    message: PUBLICATION_TAG_IS_STRING
  })
  public tags?: string[];
}
