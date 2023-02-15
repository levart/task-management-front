import { Injectable } from '@angular/core';
import {CookieService} from "../core/services/cookie.service";

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {

  get isAuth(): boolean {
    return !!this.cookieService.getCookie('accessToken');
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
