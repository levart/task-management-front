import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MainLayoutModule,
    BrowserAnimationsModule,
    AccessDeniedComponent
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
