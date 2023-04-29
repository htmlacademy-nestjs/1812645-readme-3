export interface IComment {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  publicationId?: number;
  userId: string;
  text: string;
}
