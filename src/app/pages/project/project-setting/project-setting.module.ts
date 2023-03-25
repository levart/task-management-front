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
import {MatDialogModule} from "@angular/material/dialog";
import { IssueTypeAddEditComponent } from './containers/issue-type-add-edit/issue-type-add-edit.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {UserModule} from "../../user/user.module";
import {CdkDrag, CdkDropList, DragDropModule} from "@angular/cdk/drag-drop";
import { ProjectEpicsComponent } from './containers/project-epics/project-epics.component';
import { ProjectEpicAddEditComponent } from './containers/project-epic-add-edit/project-epic-add-edit.component';
import {StoreModule} from "@ngrx/store";
import {BoardEffect, boardReducer, ProjectEffect, projectReducer, reducers} from "../../../store";
import {EffectsModule} from "@ngrx/effects";


@NgModule({
  declarations: [
    ProjectInfoComponent,
    ProjectBoardComponent,
    IssueTypesComponent,
    ProjectUsersComponent,
    BoardAddEditComponent,
    IssueTypeAddEditComponent,
    ProjectEpicsComponent,
    ProjectEpicAddEditComponent,
  ],
  imports: [
    CommonModule,
    ProjectSettingRoutingModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    UserModule,
    DragDropModule,
    StoreModule.forFeature('app', reducers),
    EffectsModule.forFeature([BoardEffect, ProjectEffect])
  ]
})
export class ProjectSettingModule { }
