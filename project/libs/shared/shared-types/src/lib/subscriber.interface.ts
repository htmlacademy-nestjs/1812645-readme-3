export interface ISubscriber {
  id?: string;
  userId: string;
  email: string;
  name: string;
  subscribeToPublications?: boolean;
}
