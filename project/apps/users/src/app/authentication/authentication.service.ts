import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser, UserRole } from '@project/shared/shared-types';
import dayjs from 'dayjs';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { LoginUserDto } from './dto/login-user.dto';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { jwtConfig } from '@project/config/config-users';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload } from '@project/util/util-core';
import * as crypto from 'node:crypto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,

    @Inject (jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  public async register(dto: CreateUserDto) {
    const {name, email, password, avatar=''} = dto;

    const existUser = await this.blogUserRepository
      .findByEmail(email);

    if(existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const blogUser = {
      email, name, avatar,
      passwordHash: '',
      role: UserRole.User,
      registrationDate: dayjs().toDate()
    }
    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);

    return this.blogUserRepository.create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;

    const existUser = await this.blogUserRepository.findByEmail(email);

    if(!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const blogUserEntity = new BlogUserEntity(existUser);
    if(!await blogUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return blogUserEntity.toObject();
  }

  public async getUser(id: string) {
    const existUser = await this.blogUserRepository.findById(id);

    if(!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return existUser;
  }

  public async updateUser(id: string, dto: UpdateUserDto) {
    const {name, email, password, avatar=''} = dto;
    const existUser = await this.blogUserRepository.findById(id);

    if(!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const blogUser = {
      email, name, avatar,
      passwordHash: '',
      role: UserRole.User,
      registrationDate: dayjs().toDate(),
    }
    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);

    return this.blogUserRepository.update(id, userEntity);
  }

  public async createUserToken(user: IUser) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      }),
    }
  }
}
