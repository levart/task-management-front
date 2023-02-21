import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BoardComponent } from './board/board.component';
import {CdkDropListGroup, DragDropModule} from "@angular/cdk/drag-drop";


@NgModule({
  declarations: [
    DashboardComponent,
    BoardComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        DragDropModule
    ]
})
export class DashboardModule { }
