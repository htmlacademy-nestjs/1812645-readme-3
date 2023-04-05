import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'user@mail.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123'
  })
  public password: string;
}
