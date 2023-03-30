import {createReducer, on} from "@ngrx/store";
import {ITask} from "../../../core/interfaces/task";
import {loadBacklogTasksSuccess} from "./backlog.actions";

export interface BacklogStateModel {
  tasks: ITask[];
}

const initialState: BacklogStateModel = {
  tasks: []
}

export const backlogReducer = createReducer(
  initialState,
  on(loadBacklogTasksSuccess, (state, {data}) => {
    console.log('data', data);
      return {
        ...state,
        tasks: data
      }
    }
  )
)
