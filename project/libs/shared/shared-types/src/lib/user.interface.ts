import { UserRole } from './user-role.enum';

export interface UserInterface {
  _id?: string;
  email: string;
  name: string;
  avatar?: string;
  passwordHash: string;
  role: UserRole;
  registrationDate: Date;
}
