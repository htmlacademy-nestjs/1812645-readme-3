import { PostsTypes } from '@project/shared/shared-types';
import { postEntityMap } from './post.entity.map';

type KeysOfPostEntityMap = keyof typeof postEntityMap;
type ExtractInstanceType<T> = T extends new () => infer R ? R : never;
enum KindOfPosts {
  video = 1,
  text = 2,
  quote = 3,
  photo = 4,
  link = 5,
}

export class PostFactory {
  public static createPost<K extends KeysOfPostEntityMap>(k: number, post: PostsTypes): ExtractInstanceType<K> {
    const kind: string = KindOfPosts[k];

    return new postEntityMap[kind](post);
  }
}
