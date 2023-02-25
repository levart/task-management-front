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


@NgModule({
  declarations: [
    UserAddEditComponent,
    UsersComponent
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
  ],
  exports: [
    UserAddEditComponent
  ]
})
export class UserModule { }
