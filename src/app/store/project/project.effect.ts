import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProjectService} from "../../core/services/project.service";
import {
  createProject,
  initCurrentProject,
  loadProjects,
  loadProjectsFailure,
  loadProjectsSuccess, loadProjectUsers, loadProjectUsersSuccess, setProject, setProjectUsers, updateProject,
} from "./project.actions";
import {catchError, map, mergeMap, of, switchMap, tap} from "rxjs";
import {Selector} from "@ngrx/store";
import {IProject} from "../../core/interfaces/project";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {loadBoards} from "../board";

@Injectable()
export class ProjectEffect {
  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  loadProjects$ = createEffect(() => this.actions$.pipe(
    ofType(loadProjects),
    switchMap(() => this.projectService.getMyProjects().pipe(
      map((data) => loadProjectsSuccess({data})),
      catchError((error) => of(loadProjectsFailure({error})))
    ))
  ))

  createProject$ = createEffect(() => this.actions$.pipe(
    ofType(createProject),
    switchMap((action) => this.projectService.createProject(action.project).pipe(
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
    switchMap((action) => this.projectService.updateProject(action.project).pipe(
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
    switchMap((action) => this.projectService.getProjectUsers().pipe(
      map((data) => loadProjectUsersSuccess({users: data})),
      catchError((error) => of(loadProjectsFailure({error})))
    ))
  ))

  setProjectUsers$ = createEffect(() => this.actions$.pipe(
    ofType(setProjectUsers),
    switchMap((action) => this.projectService.addProjectUser(action).pipe(
      // map((data) => loadProjectUsers()),
      catchError((error) => of(loadProjectsFailure({error})))
    ))
  ))


}
