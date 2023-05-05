import { Controller, Body, Post, Param, Get, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { UserRdo } from './rdo/user.rdo';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@project/util/util-core';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggerUserRdo } from './rdo/logger-user.rdo';
import { MongoIdValidationPipe } from '@project/shared/shared-pipes';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NotifyService } from '../notify/notify.service';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
    type: UserRdo,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User with this email exists.'
  })
  @Post('register')
  public async crate(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, name } = newUser;
    await this.notifyService.registerSubscriber({ email, name });

    return fillObject(UserRdo, newUser);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
    type: LoggerUserRdo,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.'
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const loggedUser = await this.authService.createUserToken(verifiedUser);

    return fillObject(LoggerUserRdo, Object.assign(verifiedUser, loggedUser));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found.',
    type: UserRdo
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found'
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);

    return fillObject(UserRdo, existUser);
  }
}
