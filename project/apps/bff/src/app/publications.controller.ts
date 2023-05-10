import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { UserIdInterceptor } from './interceptors/user-id.interceptor';
import { ApplicationServiceURL } from './app.config';
import { IPublication } from '@project/shared/shared-types';

@Controller('publications')
@UseFilters(AxiosExceptionFilter)
export class PublicationsController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: IPublication) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Publications}/`, dto);
    return data;
  }
}
