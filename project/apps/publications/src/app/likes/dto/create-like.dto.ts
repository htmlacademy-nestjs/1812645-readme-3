import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty({
    description: '',
    example: ''
  })
  userId: string;
}
