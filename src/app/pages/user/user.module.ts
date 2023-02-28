import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserAddEditComponent } from './components/user-add-edit/user-add-edit.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import { UsersComponent } from './components/users/users.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { UserRoleComponent } from './components/user-role/user-role.component';
import {MatSelectModule} from "@angular/material/select";
import {PermissionsDirective} from "../../core/directives/permissions.directive";


@NgModule({
  declarations: [
    UserAddEditComponent,
    UsersComponent,
    UserRoleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UserRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    PermissionsDirective,
  ],
  exports: [
    UserAddEditComponent
  ]
})
export class UserModule { }
