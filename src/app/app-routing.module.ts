import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./features/main-layout/main-layout.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
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
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'roles',
        loadChildren: () => import('./pages/roles/roles.module').then(m => m.RolesModule)
      },
      {
        path: 'backlog',
        loadComponent: () => import('./pages/backlog/backlog.component').then(m => m.BacklogComponent)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
