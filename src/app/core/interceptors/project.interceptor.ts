import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ProjectFacade} from "../../facades/project.service";

@Injectable()
export class ProjectInterceptor implements HttpInterceptor {

  constructor(
    private projectFacade: ProjectFacade
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const project = this.projectFacade.getProject()
    if (project) {
      request = request.clone({
        setHeaders: {
          'project': project.id.toString()
        }
      });
    }
    return next.handle(request);
  }
}
