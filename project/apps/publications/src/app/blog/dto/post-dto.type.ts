import { LinkPostDto, PhotoPostDto, QuotePostDto, TextPostDto, VideoPostDto } from './post-dto';

export type PostDtoType =
    VideoPostDto
  | TextPostDto
  | QuotePostDto
  | PhotoPostDto
  | LinkPostDto
