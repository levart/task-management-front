import {IRole} from "./role";

export interface IUser {
  id: number;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  isActive: boolean;
  userPermissions: string[];
  roles: IRole[];
  projects: string[];
}
