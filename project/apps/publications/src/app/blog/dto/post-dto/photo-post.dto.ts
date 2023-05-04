import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PhotoPostDto {
  @ApiProperty({
    description: 'Link to the photo',
    example: 'https://www.picture.com/watch?v=QdCyTTid9-U'
  })
  @Expose()
  linkToPhoto: string;
}
