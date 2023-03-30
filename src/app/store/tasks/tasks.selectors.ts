import {createSelector} from "@ngrx/store";
import {TasksStateModel} from "./tasks.reducer";

export const getTasks = createSelector(
  (state: any) => state.app.task,
  (task: TasksStateModel) => task.tasks
)


export const getBoardTasks = createSelector(
  (state: any) => state.app.task,
  (task: TasksStateModel) => task.boardTasks
)
