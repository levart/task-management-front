import {createAction, props} from "@ngrx/store";

export const loadBacklogTasks = createAction(
  '[Backlog] Load Backlog Tasks',
);

export const loadBacklogTasksSuccess = createAction(
  '[Backlog] Load Backlog Tasks Success',
  props<{ data: any }>()
);

export const loadBacklogTasksFailure = createAction(
  '[Backlog] Load Backlog Tasks Failure',
  props<{ error: any }>()
);
