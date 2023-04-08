import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, concatMap, switchMap} from 'rxjs/operators';
import {Observable, EMPTY, of, tap} from 'rxjs';
import * as PermissionActions from './permission.actions';
import {RoleService} from "../../../../core/services/role.service";
import {loadPermissionsByRole, setPermissionsFailure, setPermissionsSuccess} from "./permission.actions";


@Injectable()
export class PermissionEffects {

  loadPermissions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PermissionActions.loadPermissions),
      switchMap(() =>
        this.roleService.getPermissions().pipe(
          map((data) => PermissionActions.loadPermissionsSuccess({data})),
          catchError(error => of(PermissionActions.loadPermissionsFailure({error}))))
      )
    );
  });

  loadPermissionByRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PermissionActions.loadPermissionsByRole),
      switchMap((action) =>
        this.roleService.getRole(action.roleId).pipe(
          map((data) => PermissionActions.loadPermissionsByRoleSuccess({data})),
          catchError(error => of(PermissionActions.loadPermissionsByRoleFailure({error})))
        )
      )
    )
  )

  setPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PermissionActions.setPermissions),
      switchMap((res) => this.roleService.setPermissions({
          roleId: res.roleId,
          permissions: res.permissions
        })
          .pipe(
            map((data) => setPermissionsSuccess(data)),
            catchError((error) => of(setPermissionsFailure(error)))
          )
      )
    )
  )


  constructor(private actions$: Actions, private roleService: RoleService,) {
  }
}
