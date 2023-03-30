import {createSelector} from "@ngrx/store";
import {IUser} from "../../../core/interfaces/user";

export const users = createSelector(
  (state: any) => state.user.users,
  (users: IUser[]) => users
);

export const userTotal = createSelector(
  (state: any) => state.user.totalCount,
  (total: number) => total
);


export const getUserById = (id: number) => createSelector(
  (state: any) => state.user.users,
  (users: IUser[]) => users.find(user => user.id === id)
);


export const isLoading = createSelector(
  (state: any) => state.user.loading,
  (loading) => loading
)
