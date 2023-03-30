import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./features/main-layout/main-layout.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {PermissionGuard} from "./core/guards/permission.guard";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [AuthGuard],
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'projects',
        loadChildren: () => import('./pages/project/project.module').then(m => m.ProjectModule)
      },
      {
        path: 'users',
        canActivate: [PermissionGuard],
        data: {
          permissions: ['user:list']
        },
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'roles',
        loadChildren: () => import('./pages/roles/roles.module').then(m => m.RolesModule)
      },
      {
        path: 'backlog',
        loadChildren: () => import('./pages/backlog/backlog.module').then(m => m.BacklogModule)
      },
      {
        path: 'access-denied',
        loadComponent: () => import('./pages/access-denied/access-denied.component').then(m => m.AccessDeniedComponent)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
