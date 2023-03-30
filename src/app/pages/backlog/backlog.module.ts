import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {StoreModule} from "@ngrx/store";
import {backlogReducer} from "./store/backlog.reducer";
import {BacklogComponent} from "./backlog.component";
import {EffectsModule} from "@ngrx/effects";
import {BacklogEffects} from "./store/backlog.effects";



@NgModule({
  declarations: [
    BacklogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BacklogComponent
      },
    ]),
    MatButtonModule,
    RouterModule,
    MatTableModule,
    MatDialogModule,
    StoreModule.forFeature('backlog', backlogReducer),
    EffectsModule.forFeature([BacklogEffects])
  ]
})
export class BacklogModule { }
