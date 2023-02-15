import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {CookieService} from "../../../core/services/cookie.service";
import {ILoginPayload} from "../interfaces/login-payload";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
  ) {
  }

  submit() {
    if(this.form.invalid) {
      return;
    }

    this.authService.login(this.form.value).subscribe((res: ILoginPayload) => {
      this.cookieService.setCookie('accessToken', res.token.accessToken, 1);
      this.cookieService.setCookie('refreshToken', res.token.refreshToken, 1);
      localStorage.setItem('user', JSON.stringify(res.user));
      this.router.navigate(['/']);
    })

  }
}
