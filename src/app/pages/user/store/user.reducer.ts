import {createReducer, on} from "@ngrx/store";
import {IUser} from "../../../core/interfaces/user";
import {loadUsersSuccess} from "./user.actions";

export interface UserStateModel {
  users: IUser[];
  page: number;
  limit: number;
  totalCount: number;
}

const initialState = {
  users: [],
  page: 1,
  limit: 10,
}


export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, {data}) => {
    return {
      ...state,
      users: data.data,
      page: data.page,
      limit: data.limit,
      totalCount: data.totalCount,
    }
  })
)
