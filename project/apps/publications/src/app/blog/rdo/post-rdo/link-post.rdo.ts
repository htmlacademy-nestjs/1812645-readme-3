import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LinkPostRdo {
  @ApiProperty({ description: 'Link' })
  @Expose()
  public link: string;

  @ApiProperty({ description: 'Link post' })
  @Expose()
  public description?: string;
}
