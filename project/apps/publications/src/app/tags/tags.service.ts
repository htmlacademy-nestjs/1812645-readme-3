import { Injectable } from '@nestjs/common';
import { TagsRepository } from './tags.repository';
import { ITag } from '@project/shared/shared-types';
import { TagEntity } from './tags.entity';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(private readonly tagsRepository: TagsRepository) {}

  async createTag(dto: CreateTagDto): Promise<ITag> {
    const tagsEntity = new TagEntity(dto);
    return await this.tagsRepository.create(tagsEntity);
  }

  async getTag(id: number): Promise<ITag> {
    return await this.tagsRepository.findById(id);
  }

  async getTagsOfPublicationId(publicationId: number): Promise<ITag[]> {
    return await this.tagsRepository.findTagsOfPublicationId(publicationId);
  }

  async getTags(): Promise<ITag[]> {
    return await this.tagsRepository.findTags();
  }

  async updateTag(id: number, dto: CreateTagDto): Promise<ITag> {
    return this.tagsRepository.update(id, new TagEntity(dto));
  }

  async deleteTag(id: number): Promise<void> {
    return await this.tagsRepository.destroy(id);
  }
}
