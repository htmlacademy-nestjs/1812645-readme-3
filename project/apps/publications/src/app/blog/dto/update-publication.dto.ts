import { PublicationStatus } from '@project/shared/shared-types';
import { PostDtoType } from './post-dto.type';

export class UpdatePublicationDto {
  public status?: PublicationStatus;
  public post?: PostDtoType;
}
