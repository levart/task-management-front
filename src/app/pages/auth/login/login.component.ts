import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {CookieService} from "../../../core/services/cookie.service";
import {ILoginPayload} from "../interfaces/login-payload";
import {Router, RouterModule} from "@angular/router";
import {map, switchMap, tap} from "rxjs";
import {RoleService} from "../../../core/services/role.service";
import {select, Store} from "@ngrx/store";
import {AuthStateModel, checkLoginSuccess, isAuth, login} from "../../../store/auth";
import {Actions, ofType} from "@ngrx/effects";
import {createUserSuccess} from "../../user/store/user.actions";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private store: Store<{auth: AuthStateModel}>,
    private action$: Actions,
    private router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.titleService.setTitle('ავტორიზაცია | ჩემი თასქ-მენეჯერი')
    this.metaService.addTags([
      {
        name: 'description',
        content: 'ჩემი თასქ-მენეჯერი ბექლოგი'
      },
      {
        name: 'keywords',
        content: 'ბექლოგი, თასქები, თასქ-მენეჯერი'
      },
      {
        name: 'robots',
        content: 'index, follow'
      },
      {
        name: 'og:title',
        content: 'ბექლოგი | ჩემი თასქ-მენეჯერი'
      },
      {
        name: 'og:description',
        content: 'ჩემი თასქ-მენეჯერი ბექლოგი'
      },
      {
        name: 'og:url',
        content: 'https://task-manager.ge/backlog'
      },
      {
        name: 'og:image',
        content: 'https://task-manager.ge/assets/images/logo.png'
      },
      {
        name: 'og:type',
        content: 'website'
      },
      {
        name: 'og:site_name',
        content: 'ჩემი თასქ-მენეჯერი'
      },
      {
        name: 'twitter:card',
        content: 'summary'
      },
      {
        name: 'twitter:title',
        content: 'ბექლოგი | ჩემი თასქ-მენეჯერი'
      },
      {
        name: 'twitter:description',
        content: 'ჩემი თასქ-მენეჯერი ბექლოგი'
      },
      {
        name: 'twitter:image',
        content: 'https://task-manager.ge/assets/images/logo.png'
      },
      {
        name: 'twitter:site',
        content: '@taskmanagerge'
      }
    ])
  }

  ngOnInit() {
    this.store.pipe(
      select(isAuth),
      tap((res) => {
        if(res) {
          this.router.navigate(['/dashboard'])
        }
      })
    ).subscribe()
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(login(this.form.value));



    // this.authService.login(this.form.value)
    //   .pipe(
    //     tap((res: ILoginPayload) => {
    //       this.cookieService.setCookie('accessToken', res.token.accessToken, 1);
    //       this.cookieService.setCookie('refreshToken', res.token.refreshToken, 1);
    //       const roles = res.user.roles.map((r: any) => r.name);
    //       this.cookieService.setCookie('roles', JSON.stringify(roles), 1);
    //       localStorage.setItem('user', JSON.stringify(res.user));
    //       this.router.navigate(['/']);
    //     }),
    //     switchMap(() => this.roleService.getMyRoles()
    //       .pipe(
    //         map((res: any) => {
    //             const permissions: string[] = []
    //             const roles = res.forEach((r: any) => {
    //               r.permissions && permissions.push(...r.permissions.map((p: any) => p.name))
    //             })
    //             localStorage.setItem('permissions', JSON.stringify(permissions));
    //           }
    //         )
    //       ),
    //     )
    //   )
    //   .subscribe()

  }
}
