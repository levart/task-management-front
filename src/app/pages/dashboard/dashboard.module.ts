import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {BoardComponent} from './board/board.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";


@NgModule({
  declarations: [
    DashboardComponent,
    BoardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DragDropModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule
  ]
})
export class DashboardModule {
}
