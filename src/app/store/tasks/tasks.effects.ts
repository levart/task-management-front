import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {TaskService} from "../../core/services/task.service";
import {loadTasks, loadTasksFailure, loadTasksSuccess} from "./tasks.actions";
import {catchError, map, of, switchMap} from "rxjs";
import * as _ from "lodash";

@Injectable()
export class TasksEffects {

  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) {
  }

  loadTasks$ = createEffect( () => this.actions$.pipe(
    ofType(loadTasks),
    switchMap( (action) => this.taskService.getTasks({boardId: action.boardId})
      .pipe(
        map((tasks) => {
          return loadTasksSuccess({tasks, boardTasks: _.groupBy(tasks, 'boardColumnId')})
        }),
        catchError( (error) => of(loadTasksFailure({error})))
      )
    )
  ))
}
