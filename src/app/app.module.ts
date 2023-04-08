import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {MainLayoutModule} from "./features/main-layout/main-layout.module";
import {ProjectInterceptor} from "./core/interceptors/project.interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { PermissionsDirective } from './core/directives/permissions.directive';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {ProjectEffect, projectReducer} from "./store";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthEffects, authReducer} from "./store/auth";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    MainLayoutModule,
    BrowserAnimationsModule,
    AccessDeniedComponent,
    StoreModule.forRoot({
      auth: authReducer
    }),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProjectInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
