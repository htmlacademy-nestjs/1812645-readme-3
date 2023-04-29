import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'Comment update date.',
    example: '12-03-2022'
  })
  public updatedAt: Date;

  @ApiProperty({
    description: 'The user who wrote the comment.',
    example: '678'
  })
  public userId: string;

  @ApiProperty({
    description: 'Comment text.',
    example: 'The user who wrote the comment.'
  })
  public text: string;
}
