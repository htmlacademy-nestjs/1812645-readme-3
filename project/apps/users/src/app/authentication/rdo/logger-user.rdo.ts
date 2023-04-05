import { Expose } from 'class-transformer';

export class LoggerUserRdo {
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public name: string;

  @Expose()
  public accessToken: string;
}
