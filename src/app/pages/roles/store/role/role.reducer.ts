import {loadRoles, loadRolesSuccess} from "./role.actions";
import {createReducer, on} from "@ngrx/store";
import {IRole} from "../../../../core/interfaces/role";

export interface RoleStateModel {
  roles: IRole[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
}

export const initialState: RoleStateModel = {
  roles: [],
  total: 0,
  page: 1,
  limit: 10,
  loading: false
}


export const roleReducer = createReducer(
  initialState,
  on(loadRoles, (state) => ({...state, loading: true})),
  on(loadRolesSuccess, (state, {data, totalCount, page, limit}) => {
      return {
        ...state,
        roles: data,
        total: totalCount,
        page,
        limit,
        loading: false
      }
    }
  )
)
