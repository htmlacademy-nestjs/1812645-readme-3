import { Injectable } from '@nestjs/common';
import { PublicationEntity } from './entity/publication.entity';
import { PublicationRepository } from './publication.repository';
import { IPublication, PostsTypes } from '@project/shared/shared-types';
import { fillObject } from '@project/util/util-core';
import { postRdoMap } from './rdo/post-rdo.map';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { Publications } from '@prisma/client';
import { PublicationQuery } from './query/publication-query';

@Injectable()
export class PublicationService {
  constructor(private readonly publicationRepository: PublicationRepository) {}

  async createPublication(dto: IPublication) {
    const newPublicationEntity = new PublicationEntity(dto);
    return this.publicationRepository.create(newPublicationEntity);
  }

  async getPublication(id: number): Promise<IPublication> | null {
    const publication = await this.publicationRepository.findById(id);

    if(!publication) {
      return null;
    }
    return convertPostFromJsonToObject(publication);
  }

  async getPublications(query: PublicationQuery): Promise<IPublication[]> {
    const publications = await this.publicationRepository.find(query);
    return publications.map((publication) => {
      return convertPostFromJsonToObject(publication);
    });
  }

  async updatePublication(_id: number, _dto: UpdatePublicationDto): Promise<IPublication> {
    throw new Error('Not implemented…');
  }

  async deletePublication(id: number): Promise<void> {
    return this.publicationRepository.destroy(id);
  }
}

function convertPostFromJsonToObject(publication: Publications): IPublication {
  const {post, ...base} = publication;
  const newPost: PostsTypes = fillObject(postRdoMap[base.kindId], post);
  return {...base, post: newPost}
}
