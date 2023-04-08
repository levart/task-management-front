import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../core/services/auth.service";
import {map, of, switchMap} from "rxjs";
import {
  checkLogin, checkLoginFailure,
  checkLoginSuccess,
  loadRolesSuccess,
  login,
  loginSuccess,
  logout,
  logoutSuccess
} from "./auth.actions";
import {ILoginPayload} from "../../pages/auth/interfaces/login-payload";
import {CookieService} from "../../core/services/cookie.service";
import {RoleService} from "../../core/services/role.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private roleService: RoleService,
    private cookieService: CookieService,
    private router: Router,
  ) {
  }


  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap((action) => this.authService.login(action)
      .pipe(
        map((res: ILoginPayload) => {
          this.cookieService.setCookie('accessToken', res.token.accessToken, 1);
          this.cookieService.setCookie('refreshToken', res.token.refreshToken, 1);
          const roles = res.user.roles.map((r: any) => r.name);
          this.cookieService.setCookie('roles', JSON.stringify(roles), 1);
          localStorage.setItem('user', JSON.stringify(res.user));
          return loginSuccess({user: res.user, token: res.token, roles});
        })
      )
    )
  ));


  loadRoles$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccess),
    switchMap((action) => this.roleService.getMyRoles()
      .pipe(
        map((res: any) => {
          const permissions: string[] = []
          const roles = res.forEach((r: any) => {
            r.permissions && permissions.push(...r.permissions.map((p: any) => p.name))
          })
          localStorage.setItem('permissions', JSON.stringify(permissions));
          this.router.navigate(['/']).then()
          return loadRolesSuccess({permissions: permissions});
        })
      )
    ))
  );

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    switchMap(() => {
      this.cookieService.eraseCookie('accessToken');
      this.cookieService.eraseCookie('refreshToken');
      this.cookieService.eraseCookie('roles');
      localStorage.clear()
      this.router.navigate(['/auth']).then()
      return of(logoutSuccess());
    })
  ));

  checkLogin$ = createEffect(() => this.actions$.pipe(
    ofType(checkLogin),
    switchMap(() => {
      const accessToken = this.cookieService.getCookie('accessToken');
      if (!accessToken) {
        return  of(logout())
      }
      const refreshToken = this.cookieService.getCookie('refreshToken');
      const user = localStorage.getItem('user');
      const roles = this.cookieService.getCookie('roles');
      const permissions = this.cookieService.getCookie('roles');
      return of(checkLoginSuccess({
          user: user ? JSON.parse(user) : null,
          token: {
            accessToken: accessToken ? accessToken : null,
            refreshToken: refreshToken ? refreshToken : null,
          },
          roles: roles ? JSON.parse(roles) : [],
          permissions: permissions ? JSON.parse(permissions) : []
        }
      ));
    })
  ));
}
