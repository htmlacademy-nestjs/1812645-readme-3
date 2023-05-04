import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_POST_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from '../publication.constant';

export class PublicationQuery {
  @Transform(({ value } ) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @Transform(({ value }) => value.split(',').map((title) => title))
  @IsArray({})
  @IsOptional()
  public tags?: string[];

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
