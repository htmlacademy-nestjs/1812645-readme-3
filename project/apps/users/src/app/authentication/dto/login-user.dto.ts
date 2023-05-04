import { ApiProperty } from '@nestjs/swagger';
import { AUTH_USER_EMAIL_NOT_VALID, AUTH_USER_PASSWORD_NOT_VALID } from '../authentication.constant';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
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
}
