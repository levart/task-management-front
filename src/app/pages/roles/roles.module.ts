import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {RolesComponent} from './roles/roles.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { RoleAddEditComponent } from './role-add-edit/role-add-edit.component';
import { PermissionAddEditComponent } from './permission-add-edit/permission-add-edit.component';
import {StoreModule} from "@ngrx/store";
import {roleReducer} from "./store/role/role.reducer";
import {EffectsModule} from "@ngrx/effects";
import {RoleEffects} from "./store/role/role.effects";
import { permissionReducer} from "./store/permission/permission.reducer";
import {roleReducerMap} from "./store";
import {PermissionEffects} from "./store/permission/permission.effects";


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
    StoreModule.forFeature('role', roleReducerMap),
    EffectsModule.forFeature([RoleEffects, PermissionEffects]),
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class RolesModule {
}
