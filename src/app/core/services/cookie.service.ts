import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  setCookie(name: string, value: string, days: number) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    this.document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  getCookie(name: string) {
    let nameEQ = name + "=";
    let ca = this.document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  eraseCookie(name: string) {
    this.document.cookie = name+'=; Max-Age=-99999999;';
  }

}
