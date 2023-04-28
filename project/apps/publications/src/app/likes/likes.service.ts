import { Injectable } from '@nestjs/common';
import { LikesRepository } from './likes.repository';
import { ILike } from '@project/shared/shared-types';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeEntity } from './like.entity';

@Injectable()
export class LikesService {
  constructor(private readonly likesRepository: LikesRepository) {}

  async createLike(publicationId: number, dto: CreateLikeDto): Promise<ILike> {
    return this.likesRepository.create(publicationId, new LikeEntity(dto));
  }

  async deleteLike(id: number): Promise<void> {
    return this.likesRepository.destroy(id);
  }
}
