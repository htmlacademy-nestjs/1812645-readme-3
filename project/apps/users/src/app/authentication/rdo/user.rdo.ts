import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: "User id.",
    example: "c64f698f-2712-4250-9e84-4779e7a037a5"
  })
  @Expose({name: '_id'})
  @Transform(({obj}) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: "The user's mail is unique.",
    example: "user@mail.ru"
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: "User name.",
    example: "Mike"
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: "The user's avatar in jpeg, png format and no more than 500Kb.",
    example: "/images/picture.jpg"
  })
  @Expose()
  public avatar: string;
}
