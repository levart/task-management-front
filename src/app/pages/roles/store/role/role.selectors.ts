import {createSelector} from "@ngrx/store";

export const getRoles = createSelector(
  (state: any) => state.role.role.roles,
  (state) => state
)

export const getRoleTotal = createSelector(
  (state: any) => state.role.role.total,
  (state) => state
)
