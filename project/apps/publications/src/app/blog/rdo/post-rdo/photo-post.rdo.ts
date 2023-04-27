import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PhotoPostRdo {
  @ApiProperty({ description: 'Link to photo' })
  @Expose()
  linkToPhoto: string;
}
