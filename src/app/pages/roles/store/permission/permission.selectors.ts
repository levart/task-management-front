import {createSelector} from '@ngrx/store';
import {PermissionStateModel} from './permission.reducer';
import * as _ from "lodash";

export const getPermissions = createSelector(
  (state: any) => state.role.permission,
  (state: PermissionStateModel) => {
    const grouped = _.groupBy(state.permissions, 'groupKey');
    return Object.keys(grouped).map(key => {
      return {
        key,
        permissions: grouped[key]
      }
    })
  }
)


export const getRolePermissions = createSelector(
  (state: any) => state.role.permission,
  (state: PermissionStateModel) => state.rolePermissions
)
