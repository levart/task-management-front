import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {RolesComponent} from './roles/roles.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { RoleAddEditComponent } from './role-add-edit/role-add-edit.component';
import { PermissionAddEditComponent } from './permission-add-edit/permission-add-edit.component';


@NgModule({
  declarations: [
    RolesComponent,
    RoleAddEditComponent,
    PermissionAddEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RolesComponent
      },
      {
        path: 'permission/:roleId',
        component: PermissionAddEditComponent
      }
    ]),
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class RolesModule {
}
