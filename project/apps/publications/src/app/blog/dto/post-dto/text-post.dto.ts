import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { TEXT_POST_ANNOUNCEMENT_NOT_VALID, TEXT_POST_NAME_NOT_VALID, TEXT_POST_TEXT_NOT_VALID } from '../../publication.constant';
import { Expose } from 'class-transformer';

export class TextPostDto {
  @ApiProperty({
    description: 'Title of the post',
    example: 'Связный список.'
  })
  @Expose()
  @IsString()
  @Length(20, 50, { message: TEXT_POST_NAME_NOT_VALID })
  name: string;

  @ApiProperty({
    description: 'Publication announcement',
    example: 'Связный список (Linked List). Структуры данных. Реализация на JS.'
  })
  @Expose()
  @IsString()
  @Length(50, 255, { message: TEXT_POST_ANNOUNCEMENT_NOT_VALID })
  announcement: string;

  @ApiProperty({
    description: 'The text of the publication.',
    example: 'Связный список (Linked List). Структуры данных. Реализация на JS....И дальше еще много слов...'
  })
  @Expose()
  @IsString()
  @Length(100, 1024, { message: TEXT_POST_TEXT_NOT_VALID })
  text: string;
}
