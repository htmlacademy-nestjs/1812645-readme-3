import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class QuotePostRdo {
  @ApiProperty({ description: 'Text of Quote.' })
  @Expose()
  text: string;

  @ApiProperty({ description: 'Author of Quote.' })
  @Expose()
  authorOfQuoteId: string;
}
