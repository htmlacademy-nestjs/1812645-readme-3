import { Controller, Body, Post, Param, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { UserRdo } from './rdo/user.rdo';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@project/util/util-core';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggerUserRdo } from './rdo/logger-user.rdo';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) {}

  @Post('register')
  @ApiResponse({ type: UserRdo })
  public async crate(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);

    return fillObject(UserRdo, newUser);
  }

  @Post('login')
  @ApiResponse({ type: LoggerUserRdo })
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);

    return fillObject(LoggerUserRdo, verifiedUser)
  }

  @Get(':id')
  @ApiResponse({ type: UserRdo })
  public async show(@Param('id') id:string) {
    const existUser = await this.authService.getUser(id);

    return fillObject(UserRdo, existUser);
  }
}
