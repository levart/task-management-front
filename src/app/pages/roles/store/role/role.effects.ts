import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {RoleService} from "../../../../core/services/role.service";
import {loadRoles, loadRolesFailure, loadRolesSuccess} from "./role.actions";
import {catchError, map, of, switchMap} from "rxjs";

@Injectable()
export class RoleEffects {
  constructor(
    private actions$: Actions,
    private roleService: RoleService,
  ) {
  }

  loadRoles$ = createEffect(() => this.actions$.pipe(
      ofType(loadRoles),
      switchMap(() => this.roleService.getRoles()
        .pipe(
          map(res => loadRolesSuccess(res)),
          catchError((err) => of(loadRolesFailure(err)))
        )
      )
    )
  )
}
