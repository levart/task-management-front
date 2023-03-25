import {ActionReducerMap} from "@ngrx/store";
import {projectReducer, ProjectStateModule} from "./project";
import {boardReducer, BoardStateModule} from "./board";
import {issueTypesReducer, IssueTypesStateModel} from "./issue-types";
import {epicReducer, EpicStateModel} from "./epic";

export * from './project'
export * from './board'
export * from './issue-types'

export interface AppState {
  project: ProjectStateModule;
  board: BoardStateModule;
  issueTypes: IssueTypesStateModel;
  epic: EpicStateModel
}


export const reducers: ActionReducerMap<AppState> = {
  project: projectReducer,
  board: boardReducer,
  issueTypes: issueTypesReducer,
  epic: epicReducer
}
