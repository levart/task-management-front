import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationPopupComponent } from './confirmation-popup.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    ConfirmationPopupComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    ConfirmationPopupComponent
  ]
})
export class ConfirmationPopupModule { }
