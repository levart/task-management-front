import {createAction, props} from "@ngrx/store";
import {PaginationResponse} from "../../../../core/interfaces/pagination-response";
import {IRole} from "../../../../core/interfaces/role";

export const loadRoles = createAction(
  '[Role] Load Roles',
  props<{ page: number, limit: number }>()
)

export const loadRolesSuccess = createAction(
  '[Role] Load Roles Success',
  props<PaginationResponse<IRole>>()
)

export const loadRolesFailure = createAction(
  '[Role] Load Roles Failure',
  props<{ error: any }>()
)
