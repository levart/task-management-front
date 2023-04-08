import { createAction, props } from '@ngrx/store';
import {PaginationResponse} from "../../../../core/interfaces/pagination-response";
import {IRole} from "../../../../core/interfaces/role";

export const loadPermissions = createAction(
  '[Permission] Load Permissions'
);

export const loadPermissionsSuccess = createAction(
  '[Permission] Load Permissions Success',
  props<{data: any[]}>()
);

export const loadPermissionsFailure = createAction(
  '[Permission] Load Permissions Failure',
  props<{ error: any }>()
);


export const loadPermissionsByRole = createAction(
  '[Permission] Load Permissions By Role',
  props<{roleId: string}>()
);

export const loadPermissionsByRoleSuccess = createAction(
  '[Permission] Load Permissions By Role Success',
  props<{data: IRole}>()
);


export const loadPermissionsByRoleFailure = createAction(
  '[Permission] Load Permissions By Role Failure',
  props<{ error: any }>()
);

export const setPermissions = createAction(
  '[Permission] Set Permissions',
  props<{roleId: string, permissions: number[]}>()
);

export const setPermissionsSuccess = createAction(
  '[Permission] Set Permissions Success',
  props<{data: any[]}>()
);

export const setPermissionsFailure = createAction(
  '[Permission] Set Permissions Failure',
  props<{ error: any }>()
);

export const clearPermissionsByRole = createAction(
  '[Permission] clear permissions by role'
)
