import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileModel } from './file.model';
import { Model } from 'mongoose';
import { FileEntity } from './file.entity';
import { IFile } from '@project/shared/shared-types';

@Injectable()
export class FileRepository {
  constructor(
    @InjectModel(FileModel.name) private readonly fileModel: Model<FileModel>
  ) {}

  public async create(item: FileEntity): Promise<IFile> {
    const file = new this.fileModel(item);
    return file.save();
  }

  public async findById(id: string): Promise<IFile | null> {
    return this.fileModel
      .findOne({ _id: id})
      .exec();
  }
}
