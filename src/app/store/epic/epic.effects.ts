import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {EpicService} from "../../core/services/epic.service";
import {createEpic, deleteEpic, loadEpics, loadEpicsFailure, loadEpicsSuccess, updateEpic} from "./epic.actions";
import {catchError, map, of, switchMap} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class EpicEffects {
  constructor(
    private readonly actions$: Actions,
    private epicService: EpicService,
    private router: Router,
  ) {
  }

  loadEpics$ = createEffect(() => this.actions$.pipe(
    ofType(loadEpics),
    switchMap(() => this.epicService.getEpics().pipe(
      map((data) => loadEpicsSuccess({data})),
      catchError((error) => of(loadEpicsFailure({error})))
    ))
  ))

  createEpic$ = createEffect(() => this.actions$.pipe(
    ofType(createEpic),
    switchMap((action) => this.epicService.createEpic(action.epic).pipe(
      map((data) => {
        this.router.navigate(['/projects/setting/epics']).then()
        return loadEpics()
      }),
      catchError((error) => of(loadEpicsFailure({error})))
    ))
  ))

  updateEpic$ = createEffect(() => this.actions$.pipe(
    ofType(updateEpic),
    switchMap((action) => this.epicService.updateEpic(action.epic).pipe(
      map((data) => {
        this.router.navigate(['/projects/setting/epics']).then()
        return loadEpics()
      }),
      catchError((error) => of(loadEpicsFailure({error})))
    ))
  ))

  deleteEpic$ = createEffect(() => this.actions$.pipe(
    ofType(deleteEpic),
    switchMap((action) => this.epicService.deleteEpic(action.epicId).pipe(
      map((data) => {
        return loadEpics()
      }),
      catchError((error) => of(loadEpicsFailure({error})))
    ))
  ))
}
