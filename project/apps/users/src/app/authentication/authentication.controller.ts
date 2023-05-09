import { Controller, Body, Post, Param, Get, HttpStatus, HttpCode, UseGuards, Patch, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { UserRdo } from './rdo/user.rdo';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@project/util/util-core';
import { LoggerUserRdo } from './rdo/logger-user.rdo';
import { MongoIdValidationPipe } from '@project/shared/shared-pipes';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NotifyService } from '../notify/notify.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from '@project/shared/shared-types';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

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
    const { _id, email, name } = newUser;

    await this.notifyService.registerSubscriber({
      userId: _id, email, name, subscribeToPublications: dto.subscribeToPublications
    });

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
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated.',
    type: UserRdo
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found'
  })
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.authService.updateUser(id, dto);

    if(updatedUser) {
      const { email, name, subscribeToPublications } = dto;
      await this.notifyService.updatedSubscriber({ userId: id, email, name, subscribeToPublications });
    }

    return fillObject(UserRdo, updatedUser);
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
