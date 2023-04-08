import {AuthStateModel} from "./auth.reducer";
import {createSelector} from "@ngrx/store";

export const isAuth = createSelector(
  (state: any) => state.auth,
  (auth) => auth?.isAuth
);

export const accessToken = createSelector(
  (state: any) => state.auth.token,
  (token) => token?.accessToken
);
