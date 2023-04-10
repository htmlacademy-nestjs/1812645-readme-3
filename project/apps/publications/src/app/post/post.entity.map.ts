import { VideoPostEntity, TextPostEntity, QuotePostEntity, PhotoPostEntity, LinkPostEntity } from "./entity"

export const postEntityMap = {
  video: VideoPostEntity,
  text: TextPostEntity,
  quote: QuotePostEntity,
  photo: PhotoPostEntity,
  link: LinkPostEntity,
}
