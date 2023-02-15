import {IProject} from "./project";
import {ITask} from "./task";
import {ETaskStatus} from "../enums/task-status.enum";

export interface IBoard {
  id: number;
  name: string;
  description: string;
  position: number;
  projectId: number;
  project: IProject;
  columns: Column[];
  tasks: ITask[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface Column {
  id: number;
  name: string;
  description: string;
  position: number;
  taskStatus: ETaskStatus;
  boardId: number;
  board: string;
  tasks: ITask[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
