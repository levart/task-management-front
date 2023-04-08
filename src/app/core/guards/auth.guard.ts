import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {first, map, Observable, of, switchMap} from 'rxjs';
import {AuthFacade} from "../../facades/auth.service";
import {select, Store} from "@ngrx/store";
import {AuthStateModel, isAuth} from "../../store/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private store: Store<{auth: AuthStateModel}>,
    private authFacade: AuthFacade,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store
      .pipe(
        select(isAuth),
        first(),
        map((isAuth) => {
          if (isAuth) {
            return true;
          }
          return this.router.createUrlTree(['/auth'])
        })
      )
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store
      .pipe(
        select(isAuth),
        first(),
        map((isAuth) => {
          if (isAuth) {
            return true;
          }
          return this.router.createUrlTree(['/auth'])
        })
      )
  }

}
