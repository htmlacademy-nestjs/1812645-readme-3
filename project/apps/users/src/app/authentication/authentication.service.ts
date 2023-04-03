import { ConflictException, Injectable } from '@nestjs/common';
import { BlogUserMemoryRepository } from '../blog-user/blog-user-memory.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from '@project/shared/shared-types';
import dayjs from 'dayjs';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { AUTH_USER_EXISTS } from './authentication.constant';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserMemoryRepository
  ) {}

  public async register(dto: CreateUserDto) {
    const {name, email, password, avatar=''} = dto;

    const existUser = await this.blogUserRepository
      .findByEmail(email);

    if(existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const blogUser = {
      email, name, avatar, passwordHash: '', role: UserRole.User,
      registrationDate: dayjs().toDate()
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(password);

    return this.blogUserRepository
      .create(userEntity);
  }
}
