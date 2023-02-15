import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {ILoginPayload} from "../../pages/auth/interfaces/login-payload";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{

  login(data: any): Observable<ILoginPayload> {
    return this.post<ILoginPayload>('auth/login', data);
  }

  register(data: any) {
    return this.post('auth/signup', data);
  }

  refreshToken(refreshToken: string): Observable<ILoginPayload> {
    return this.post<ILoginPayload>('auth/token', {refreshToken});
  }

  chckEmail(email: any) {
    return this.post('auth/checkEmail', {email});
  }
}
