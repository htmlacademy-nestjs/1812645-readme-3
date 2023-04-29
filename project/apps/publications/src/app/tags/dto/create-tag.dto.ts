import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    description: 'Name of tag',
    example: 'Bags'
  })
  public title: string;
}
