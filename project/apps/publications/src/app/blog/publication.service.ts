import { Injectable } from '@nestjs/common';
import { PublicationDto } from './dto/publication.dto';
import { PublicationEntity } from './entity/publication.entity';
import { PublicationRepository } from './publication.repository';
import { IPublication } from '@project/shared/shared-types';

@Injectable()
export class PublicationService {
  constructor(private readonly publicationRepository: PublicationRepository) {}

  public async createPublication(dto: PublicationDto) {
    const newPublicationEntity = new PublicationEntity(dto)
      .setStatus(dto.status)
      .setDateOfCreation()
      .setDateOfPublication();

    return this.publicationRepository.create(newPublicationEntity);
  }

  async getPublication(id: number): Promise<IPublication> | null {
    return this.publicationRepository.findById(id);
  }

  async deletePublication(id: number): Promise<void> {
    return this.publicationRepository.destroy(id);
  }
}
