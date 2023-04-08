import {createFeature, createReducer, on} from '@ngrx/store';
import * as PermissionActions from './permission.actions';
import {clearPermissionsByRole} from "./permission.actions";
import {state} from "@angular/animations";

export interface PermissionStateModel {
  permissions: any[];
  rolePermissions: string[];
  loading: boolean;
}

export const initialState: PermissionStateModel = {
  permissions: [],
  rolePermissions: [],
  loading: false,
};

export const permissionReducer = createReducer(
  initialState,
  on(PermissionActions.loadPermissions, state => state),
  on(PermissionActions.loadPermissionsSuccess, (state, action) => {
    return {
      ...state,
      permissions: action.data,
      loading: false
    };
  }),
  on(PermissionActions.loadPermissionsFailure, (state, action) => state),
  on(PermissionActions.loadPermissionsByRoleSuccess, (state, action) => {
    return {
      ...state,
      rolePermissions: action.data.permissions.map((permission: any) => permission.id),
      loading: false
    };
  }),
  on(PermissionActions.clearPermissionsByRole, (state) => {
    return {
      ...state,
      rolePermissions: [],
    }
  })
);


