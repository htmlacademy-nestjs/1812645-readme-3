import { PublicationStatus } from '@project/shared/shared-types';

export class UpdatePublicationDto {
  public dateOfPublication: Date;
  public status?: PublicationStatus;
}
