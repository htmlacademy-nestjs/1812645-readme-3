import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser, TokenPayload, UserRole } from '@project/shared/shared-types';
import dayjs from 'dayjs';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { LoginUserDto } from './dto/login-user.dto';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
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

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(password);

    return this.blogUserRepository
      .create(userEntity);
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

  public async createUserToken(user: IUser) {
    const payload: TokenPayload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      name: user.name
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
