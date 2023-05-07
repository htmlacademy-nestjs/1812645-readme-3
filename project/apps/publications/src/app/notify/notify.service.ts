import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/config/config-users';
import { ConfigType } from '@nestjs/config';
import { IPublication, RabbitRouting } from '@project/shared/shared-types';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async mailingNewPublications(publications: IPublication[]) {
    return this.rabbitClient.publish<IPublication[]>(
      this.rabbiOptions.exchange,
      RabbitRouting.mailingNewPublications,
      { ...publications }
    );
  }
}
