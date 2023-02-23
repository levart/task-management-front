import {IUser} from "./user";
import {IProject} from "./project";
import {IIssueType} from "./issue-type";
import {IEpic} from "./epic";

export interface ITask {
  id: number;
  name: string;
  description: string;
  issueTypeId: number;
  issueType?: IIssueType;
  epicId: number;
  epic?: IEpic;
  projectId?: number;
  project?: IProject;
  boardId: number;
  board: string;
  boardColumnId: number;
  boardColumn: string;
  isBacklog: boolean;
  priority: string;
  taskStatus: string;
  assigneeId: number;
  assignee: IUser;
  reporterId: number;
  reporter: IUser;
  createdById: number;
  createdBy: IUser;
  deletedById: number;
  deletedBy: IUser;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  taskProperty: ITaskProperty[];
}

export interface ITaskProperty {
  id: number;
  name: string;
  filedName: string;
  value: string;
  isRequired: boolean;
}
