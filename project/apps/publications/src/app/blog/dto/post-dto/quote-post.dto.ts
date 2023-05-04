import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { QUOTE_POST_AUTHOR_NOT_VALID, QUOTE_POST_TEXT_NOT_VALID } from '../../publication.constant';

export class QuotePostDto {
  @ApiProperty({
    description: 'Quote text',
    example: 'Не имеет значения, как медленно вы идете до тех пор, пока не остановитесь.'
  })
  @Expose()
  @IsString()
  @Length(20, 300, { message: QUOTE_POST_TEXT_NOT_VALID })
  public text: string;

  @ApiProperty({
    description: 'Author of quote',
    example: 'Конфуций'
  })
  @Expose()
  @IsString()
  @Length(3, 50, { message: QUOTE_POST_AUTHOR_NOT_VALID })
  public authorOfQuoteId: string;
}
