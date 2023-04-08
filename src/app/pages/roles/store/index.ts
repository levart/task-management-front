import {roleReducer, RoleStateModel} from "./role/role.reducer";
import {permissionReducer, PermissionStateModel} from "./permission/permission.reducer";

export interface RoleState {
    role: RoleStateModel;
    permission: PermissionStateModel;
}

export const roleReducerMap = {
    role: roleReducer,
    permission: permissionReducer
}



