import {createReducer, on} from "@ngrx/store";
import {checkLoginSuccess, loadRolesSuccess, login, loginFailure, loginSuccess, logoutSuccess} from "./auth.actions";
import {IUser} from "../../core/interfaces/user";
import {ILoginPayload, IToken} from "../../pages/auth/interfaces/login-payload";

export interface AuthStateModel {
  loading: boolean;
  user?: IUser;
  token?: IToken;
  roles?: string[];
  isAuth?: boolean;
  permissions?: string[];
}

const intialState: AuthStateModel = {
  loading: false,
  user: undefined,
  token: undefined,
  roles: [],
  isAuth: false,
  permissions: [],
}

export const authReducer = createReducer(
  intialState,
  on(login, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(loginSuccess, (state: AuthStateModel, action: ILoginPayload) => {
    return {
      ...state,
      loading: false,
      user: action.user,
      token: action.token,
      roles: action.roles,
      isAuth: true,
    };
  }),
  on(loginFailure, (state: AuthStateModel) => {
    return {
      ...state,
      loading: false,
      user: undefined,
      token: undefined,
      roles: [],
      permissions: [],
      isAuth: false,
    };
  }),
  on(loadRolesSuccess, (state: AuthStateModel, action: any) => {
    return {
      ...state,
      loading: false,
      permissions: action.permissions,
    };
  }),
  on(logoutSuccess, (state: AuthStateModel) => {
    return {
      ...state,
      loading: false,
      user: undefined,
      token: undefined,
      roles: [],
      permissions: [],
      isAuth: false,
    };
  }),
  on(checkLoginSuccess, (state: AuthStateModel, action: any) => {
    return {
      ...state,
      loading: false,
      user: action.user,
      token: action.token,
      roles: action.roles,
      permissions: action.permissions,
      isAuth: true,
    };
  })
);
