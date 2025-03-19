import { UserRole } from './user-role';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}
