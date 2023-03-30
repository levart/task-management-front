import {createReducer, on} from "@ngrx/store";
import {IUser} from "../../../core/interfaces/user";
import {loadUsers, loadUsersFailure, loadUsersSuccess} from "./user.actions";

export interface UserStateModel {
  users: IUser[];
  page: number;
  limit: number;
  totalCount: number;
  loading: boolean
}

const initialState = {
  users: [],
  page: 1,
  limit: 10,
  totalCount: 0,
  loading: false
}


export const userReducer = createReducer(
  initialState,
  on(loadUsers, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(loadUsersSuccess, (state, {data}) => {
    return {
      ...state,
      users: data.data,
      page: data.page,
      limit: data.limit,
      totalCount: data.totalCount,
      loading: false
    }
  }),
  on(loadUsersFailure, (state) => {
    return {
      ...state,
      loading: false
    }
  })
)
