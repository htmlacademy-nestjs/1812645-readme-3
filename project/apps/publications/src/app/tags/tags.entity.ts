import { ITag } from '@project/shared/shared-types';

export class TagEntity implements ITag {
  public id: number;
  public title: string;

  constructor(tag: ITag) {
    this.id = tag.id;
    this.title = tag.title;
  }

  public toObject() {
    return { ...this }
  }
}
