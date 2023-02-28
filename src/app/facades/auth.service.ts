import { Injectable } from '@angular/core';
import {CookieService} from "../core/services/cookie.service";

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {

  get isAuth(): boolean {
    return !!this.cookieService.getCookie('accessToken');
  }

  get roles(): string[] {
    const roles = this.cookieService.getCookie('roles')
    return (roles ? JSON.parse(roles) : []) as string[];
  }
  get permissions(): string[] {
    const permissions = localStorage.getItem('permissions')
    return (permissions ? JSON.parse(permissions) : []) as string[];
  }

  constructor(
    private cookieService: CookieService,
  ) { }

  logout() {
    this.cookieService.eraseCookie('accessToken');
    this.cookieService.eraseCookie('refreshToken');
    localStorage.clear()
  }
}
