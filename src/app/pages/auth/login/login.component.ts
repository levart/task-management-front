import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {CookieService} from "../../../core/services/cookie.service";
import {ILoginPayload} from "../interfaces/login-payload";
import {Router, RouterModule} from "@angular/router";
import {map, switchMap, tap} from "rxjs";
import {RoleService} from "../../../core/services/role.service";

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
    private roleService: RoleService,
    private router: Router,
  ) {
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.form.value)
      .pipe(
        tap((res: ILoginPayload) => {
          this.cookieService.setCookie('accessToken', res.token.accessToken, 1);
          this.cookieService.setCookie('refreshToken', res.token.refreshToken, 1);
          const roles = res.user.roles.map((r: any) => r.name);
          this.cookieService.setCookie('roles', JSON.stringify(roles), 1);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/']);
        }),
        switchMap(() => this.roleService.getMyRoles()
          .pipe(
            map((res: any) => {
                const permissions: string[] = []
                const roles = res.forEach((r: any) => {
                  r.permissions && permissions.push(...r.permissions.map((p: any) => p.name))
                })
                localStorage.setItem('permissions', JSON.stringify(permissions));
              }
            )
          ),
        )
      )
      .subscribe()

  }
}
