import { ApiProperty } from '@nestjs/swagger';
import { AUTH_USER_EMAIL_NOT_VALID, AUTH_USER_NAME_NOT_VALID, AUTH_USER_PASSWORD_NOT_VALID } from '../authentication.constant';
import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User id',
    example: '1254'
  })
  public id: string;

  @ApiProperty({
    description: 'User name',
    example: 'Mike'
  })
  @IsString()
  @Length(3, 50, { message: AUTH_USER_NAME_NOT_VALID })
  public name: string;

  @ApiProperty({
    description: 'User unique email',
    example: 'user@mail.ru'
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123'
  })
  @IsString()
  @Length(6, 12, { message: AUTH_USER_PASSWORD_NOT_VALID })
  public password: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'picture.jpg'
  })
  public avatar?: string;

  @ApiProperty({
    description: 'Subscribe to publications.',
    example: 'true'
  })
  public subscribeToPublications?: boolean;
}
