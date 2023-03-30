import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loadBacklogTasks, loadBacklogTasksFailure, loadBacklogTasksSuccess} from "./backlog.actions";
import {catchError, map, of, switchMap} from "rxjs";
import {TaskService} from "../../../core/services/task.service";

@Injectable()
export class BacklogEffects {
  constructor(
    private actions$: Actions,
    private taskService: TaskService,
  ) {
  }

  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(loadBacklogTasks),
    switchMap((action) => this.taskService.getTasks({
        isBacklog: true
      }).pipe(
        map((data) => loadBacklogTasksSuccess({data})),
        catchError((error) => of(loadBacklogTasksFailure({error})))
      )
    ),
  ));
}
