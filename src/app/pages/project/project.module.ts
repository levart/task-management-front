import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectSettingComponent } from './project-setting/project-setting.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectAddEditComponent } from './project-add-edit/project-add-edit.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    ProjectSettingComponent,
    ProjectListComponent,
    ProjectAddEditComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class ProjectModule { }
