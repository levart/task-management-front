import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProjectService} from "../../core/services/project.service";
import {
  createProject,
  initCurrentProject,
  loadProjects,
  loadProjectsFailure,
  loadProjectsSuccess,
  loadProjectUsers,
  loadProjectUsersSuccess,
  setProject,
  setProjectSuccess,
  setProjectUsers,
  updateProject,
} from "./project.actions";
import {catchError, exhaustMap, filter, map, mergeMap, of, switchMap, tap, withLatestFrom} from "rxjs";
import {select, Selector, Store} from "@ngrx/store";
import {IProject} from "../../core/interfaces/project";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Injectable()
export class ProjectEffect {
  constructor(
    private store: Store,
    private actions$: Actions,
    private projectService: ProjectService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  loadProjects$ = createEffect(() => this.actions$.pipe(
    ofType(loadProjects),
    exhaustMap(() => this.projectService.getMyProjects().pipe(
      map((projects) => loadProjectsSuccess({projects})),
      catchError((error) => of(loadProjectsFailure({error})))
    ))
  ))

  createProject$ = createEffect(() => this.actions$.pipe(
    ofType(createProject),
    exhaustMap((action) => this.projectService.createProject(action.project).pipe(
      tap((res: IProject) => loadProjects()),
      map((res: IProject) => {
        this._snackBar.open('Project created', 'Close', {
          duration: 2000,
        })

        this.router.navigate(['/projects/setting']).then();
        return setProject({projectId: res.id})
      }),
      catchError((error) => of(loadProjectsFailure({error})))
    ))
  ))


  updateProject$ = createEffect(() => this.actions$.pipe(
    ofType(updateProject),
    exhaustMap((action) => this.projectService.updateProject(action.project).pipe(
      tap((res: IProject) => loadProjects()),
      map((res: IProject) => {
        this._snackBar.open('Project updated', 'Close', {
          duration: 2000,
        })

        this.router.navigate(['/projects/setting']).then();
        return setProject({projectId: res.id})
      }),
      catchError((error) => of(loadProjectsFailure({error})))
    ))
  ))

  loadProjectUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadProjectUsers),
    exhaustMap((action) => this.projectService.getProjectUsers().pipe(
      map((data) => loadProjectUsersSuccess({users: data})),
      catchError((error) => of(loadProjectsFailure({error})))
    ))
  ))

  setProjectUsers$ = createEffect(() => this.actions$.pipe(
    ofType(setProjectUsers),
    exhaustMap((action) => this.projectService.addProjectUser(action).pipe(
      // map((data) => loadProjectUsers()),
      catchError((error) => of(loadProjectsFailure({error})))
    ))
  ))


  setProject$ = createEffect( () => this.actions$.pipe(
    ofType(setProject),
    mergeMap( (action) => {
      return this.projectService.getProject(action.projectId)
        .pipe(
          map( (res) => {
            return setProjectSuccess({project: res})
          }),
        )
    })
  ))

  setProjectSuccess$ = createEffect( () => this.actions$.pipe(
    ofType(setProjectSuccess),
    tap( (action) => {
      localStorage.setItem('project', JSON.stringify(action.project))
    })
  ), {dispatch: false})

}
