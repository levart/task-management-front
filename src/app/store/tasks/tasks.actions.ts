import {createAction, props} from "@ngrx/store";
import {ITask} from "../../core/interfaces/task";

export const loadTasks = createAction(
  '[TASKS] load tasks',
  props<{boardId: number}>()
)

export const loadTasksSuccess = createAction(
  '[TASKS] load tasks success',
  props<{tasks: ITask[], boardTasks: any}>()
)

export const loadTasksFailure = createAction(
  '[TASKS] load tasks failure',
  props<{error: any}>()
)


