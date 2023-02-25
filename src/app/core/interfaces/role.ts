export interface IRole {
  id: string;
  createdAt: Date;
  name: string;
  type: string;
  permissions: string[];
}
