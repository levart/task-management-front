import {createReducer, on} from "@ngrx/store";
import {ITask} from "../../core/interfaces/task";
import {loadTasksSuccess} from "./tasks.actions";

export interface TasksStateModel {
 tasks: ITask[],
  boardTasks: any
}

const initialState:TasksStateModel = {
  tasks: [],
  boardTasks: {}
}

export const tasksReducer = createReducer(
  initialState,
  on(loadTasksSuccess, (state, action) => {
    return {
      ...state,
      tasks: action.tasks,
      boardTasks: action.boardTasks
    }
  })
)
