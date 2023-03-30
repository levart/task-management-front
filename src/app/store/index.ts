import {ActionReducerMap} from "@ngrx/store";
import {projectReducer, ProjectStateModule} from "./project";
import {boardReducer, BoardStateModule} from "./board";
import {issueTypesReducer, IssueTypesStateModel} from "./issue-types";
import {epicReducer, EpicStateModel} from "./epic";
import {tasksReducer, TasksStateModel} from "./tasks";

export * from './project'
export * from './board'
export * from './issue-types'

export interface AppState {
  project: ProjectStateModule;
  board: BoardStateModule;
  issueTypes: IssueTypesStateModel;
  epic: EpicStateModel,
  task: TasksStateModel
}


export const reducers: ActionReducerMap<AppState> = {
  project: projectReducer,
  board: boardReducer,
  issueTypes: issueTypesReducer,
  epic: epicReducer,
  task: tasksReducer
}
