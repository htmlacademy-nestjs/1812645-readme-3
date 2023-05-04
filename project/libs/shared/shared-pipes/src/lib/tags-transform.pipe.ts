import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { IPublication } from '@project/shared/shared-types';
import { CreatePublicationDto } from '../../../../../apps/publications/src/app/blog/dto/create-publication.dto';

@Injectable()
export class TagsTransformToObjectArray implements PipeTransform<CreatePublicationDto, IPublication> {
  transform(value: CreatePublicationDto, { type }: ArgumentMetadata) {
    if (type !== 'body') {
      throw new Error('This pipe must used only with params!')
    }
    const {tags, ...base} = value;

    const itags = tags.map(item => {
      const tag = item.toLowerCase();
      return {
        title: tag
      }
    });

    return {...base, tags: itags};
  }
}
