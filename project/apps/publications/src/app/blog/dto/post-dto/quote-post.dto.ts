import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class QuotePostDto {
  @ApiProperty({ description: 'Text' })
  @Expose()
  public text: string;

  @ApiProperty({ description: 'Author of video' })
  @Expose()
  public authorOfQuoteId: string;
}
