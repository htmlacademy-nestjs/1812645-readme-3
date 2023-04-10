import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggerUserRdo {
  @ApiProperty({
    description: "User id",
    example: "c64f698f-2712-4250-9e84-4779e7a037a5"
  })
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: "The user's mail is unique.",
    example: "user@mail.ru"
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: "User name",
    example: "Mike"
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: "The token that the server generates.",
    example: "ogjmg09asdofsf[p458900jasdfapsdf"
  })
  @Expose()
  public accessToken: string;
}
