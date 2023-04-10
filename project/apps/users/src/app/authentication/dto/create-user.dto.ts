import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Mike'
  })
  public name: string;

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

  @ApiProperty({
    description: 'User avatar',
    example: 'pictire.jpg'
  })
  public avatar?: string;
}
