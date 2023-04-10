import { Injectable } from '@nestjs/common';
import { PublicationMemoryRepository } from './publication-memory.repository';
import { PublicationDto } from './dto/publication.dto';
import { PublicationEntity } from './entity/publication.entity';

@Injectable()
export class PublicationService {
  constructor(private readonly postRepository: PublicationMemoryRepository) {}

  public async create(dto: PublicationDto) {
    // TODO Проверка на существование автора
    const newPost = new PublicationEntity(dto)
      .setStatus(dto.status)
      .setDateOfCreation()
      .setDateOfPublication();

    return this.postRepository.create(newPost);
  }
}
