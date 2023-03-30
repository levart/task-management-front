import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainLayoutComponent} from './main-layout.component';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {PermissionsDirective} from "../../core/directives/permissions.directive";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {BoardEffect, IssueTypesEffects, ProjectEffect, reducers} from "../../store";
import {EpicEffects} from "../../store/epic";
import {TasksEffects} from "../../store/tasks";


@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PermissionsDirective,
    StoreModule.forFeature('app', reducers),
    EffectsModule.forFeature([BoardEffect, ProjectEffect, IssueTypesEffects, EpicEffects, TasksEffects])
  ],
  exports: [
    MainLayoutComponent,
    HeaderComponent
  ]
})
export class MainLayoutModule {
}
