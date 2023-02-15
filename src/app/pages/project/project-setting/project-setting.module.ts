import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectSettingRoutingModule } from './project-setting-routing.module';
import { ProjectInfoComponent } from './containers/project-info/project-info.component';
import { ProjectBoardComponent } from './containers/project-board/project-board.component';
import { IssueTypesComponent } from './containers/issue-types/issue-types.component';
import { ProjectUsersComponent } from './containers/project-users/project-users.component';
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import { BoardAddEditComponent } from './containers/board-add-edit/board-add-edit.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProjectInfoComponent,
    ProjectBoardComponent,
    IssueTypesComponent,
    ProjectUsersComponent,
    BoardAddEditComponent,
  ],
  imports: [
    CommonModule,
    ProjectSettingRoutingModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class ProjectSettingModule { }
