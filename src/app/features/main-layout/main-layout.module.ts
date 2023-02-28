import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {PermissionsDirective} from "../../core/directives/permissions.directive";



@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
      PermissionsDirective
    ],
  exports: [
    MainLayoutComponent,
    HeaderComponent
  ]
})
export class MainLayoutModule { }
