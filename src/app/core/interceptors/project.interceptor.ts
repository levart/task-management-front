import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {first, Observable, switchMap} from 'rxjs';
import {ProjectStateModule} from "../../store";
import {select, Store} from "@ngrx/store";
import {currentProject} from "../../store/project/project.seletors";

@Injectable()
export class ProjectInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<{ project: ProjectStateModule }>,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store
      .pipe(
        select(currentProject),
        first(),
        switchMap((project) => {
          if (project) {
            request = request.clone({
              setHeaders: {
                'project': project.id.toString()
              }
            });
          }
          return next.handle(request);
        })
      )
  }
}
