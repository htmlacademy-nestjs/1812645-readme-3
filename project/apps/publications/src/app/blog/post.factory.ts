import { PostsTypes } from '@project/shared/shared-types';
import { postEntityMap } from './post.entity.map';

type KeysOfPostEntityMap = keyof typeof postEntityMap;
type ExtractInstanceType<T> = T extends new () => infer R ? R : never;
// TODO добавить проверку переданного ключа для Post
// type Key<K> = [K] extends (K extends Keys ? [K] : never) ? K : never;

export class PostFactory {
  public static createPost<K extends KeysOfPostEntityMap>(k: string, post: PostsTypes): ExtractInstanceType<K> {
    return new postEntityMap[k](post);
  }
}
