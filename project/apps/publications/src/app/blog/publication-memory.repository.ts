import { Injectable } from '@nestjs/common';
import { IPublication } from '@project/shared/shared-types';
import { PublicationEntity } from './entity/publication.entity';
import { CRUDRepository } from '@project/util/util-types';
import crypto from 'crypto';

@Injectable()
export class PublicationMemoryRepository implements CRUDRepository<
  PublicationEntity, string, IPublication> {

  private repository: {[key: string]: IPublication} = {};

  public async create(item: PublicationEntity): Promise<IPublication> {
    const entry = {...item, _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;

    return {...entry};
  }

  public async findById(id: string): Promise<IPublication> {
    if(this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async update(id: string, item: PublicationEntity): Promise<IPublication> {
    this.repository[id] = {...item, _id: id};

    return this.findById(id);
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }
}
