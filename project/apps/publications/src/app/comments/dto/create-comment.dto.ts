import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The user who wrote the comment.',
    example: '345'
  })
  public userId: string;

  @ApiProperty({
    description: 'Comment text.',
    example: 'The user who wrote the comment.'
  })
  public text: string;
}
