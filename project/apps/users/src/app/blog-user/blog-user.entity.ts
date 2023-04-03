import { IUser, UserRole } from '@project/shared/shared-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity implements IUser {
  public _id: string;
  public email: string;
  public name: string;
  public avatar: string;
  public passwordHash: string;
  public role: UserRole;
  public registrationDate: Date;

  constructor(blogUser: IUser) {
    this.fillEntity(blogUser);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(blogUser: IUser) {
    this._id = blogUser._id;
    this.email = blogUser.email;
    this.name = blogUser.name;
    this.avatar = blogUser.avatar;
    this.passwordHash = blogUser.passwordHash;
    this.role = blogUser.role;
    this.registrationDate = blogUser.registrationDate;
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);

    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
