import {createAction, props} from "@ngrx/store";
import {ILoginPayload} from "../../pages/auth/interfaces/login-payload";

export const checkLogin = createAction(
  '[Auth] Check Login',
);

export const checkLoginSuccess = createAction(
  '[Auth] Check Login Success',
  props<{
    user: any,
    token: any,
    roles: string[],
    permissions: string[],
  }>()
);

export const checkLoginFailure = createAction(
  '[Auth] Check Login Failure',
  props<{ error: any }>()
);


export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);


export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<ILoginPayload>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const logout = createAction(
  '[Auth] Logout'
);

export const logoutSuccess = createAction(
  '[Auth] Logout Success'
);

export const refreshToken = createAction(
  '[Auth] Refresh Token',
)

export const refreshTokenSuccess = createAction(
  '[Auth] Refresh Token Success',
  props<ILoginPayload>()
);

export const refreshTokenFailure = createAction(
  '[Auth] Refresh Token Failure',
  props<{ error: any }>()
);


export const loadRoles = createAction(
  '[Auth] Load Roles',
);

export const loadRolesSuccess = createAction(
  '[Auth] Load Roles Success',
  props<{ permissions: string[] }>()
);

export const loadRolesFailure = createAction(
  '[Auth] Load Roles Failure',
  props<{ error: any }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ email: string; password: string }>()
);
