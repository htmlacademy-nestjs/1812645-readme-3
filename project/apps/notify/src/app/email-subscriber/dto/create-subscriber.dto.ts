import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';
import { EMAIL_NOT_VALID, NAME_IS_EMPTY, SUBSCRIBE_TO_PUBLICATION_NOT_VALID, USER_ID_IS_EMPTY } from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsNotEmpty({ message: USER_ID_IS_EMPTY })
  public userId: string;

  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email: string;

  @IsNotEmpty({ message: NAME_IS_EMPTY })
  public name: string;

  @IsBoolean({ message: SUBSCRIBE_TO_PUBLICATION_NOT_VALID })
  public subscribeToPublications: boolean;
}
