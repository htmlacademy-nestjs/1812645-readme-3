import { ApiProperty } from '@nestjs/swagger';
import { ITag } from '@project/shared/shared-types';
import { Expose } from 'class-transformer';

export class TagRdo implements ITag {
  @ApiProperty({
    description: 'Id of tag.',
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Title of tag',
  })
  @Expose()
  title: string;
}
