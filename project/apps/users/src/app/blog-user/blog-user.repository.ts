import { IUser } from '@project/shared/shared-types';
import { CRUDRepository } from '@project/util/util-types';
import { BlogUserEntity } from './blog-user.entity';
import { Injectable } from '@nestjs/common';
import { BlogUserModel } from './blog-user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BlogUserRepository implements CRUDRepository<BlogUserEntity, string, IUser> {
  constructor(
    @InjectModel(BlogUserModel.name)
      private readonly blogUserModel: Model<BlogUserModel>
  ){}

  public async create(item: BlogUserEntity): Promise<IUser> {
    const newBlogUser = new this.blogUserModel(item);

    return newBlogUser.save();
  }

  public async findById(id: string): Promise<IUser | null> {
    return this.blogUserModel
      .findOne({_id: id})
      .exec();
  }

  public async update(id: string, item: BlogUserEntity): Promise<IUser> {
    return this.blogUserModel
      .findByIdAndUpdate({_id: id}, item.toObject(), {new: true})
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    this.blogUserModel
      .deleteOne({_id: id})
      .exec();
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return this.blogUserModel
      .findOne({email})
      .exec();
  }
}
