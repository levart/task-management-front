import { Component } from '@angular/core';
import {ProjectFacade} from "../../../../../facades/project.facade";
import {IProject} from "../../../../../core/interfaces/project";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {ProjectStateModule} from "../../../../../store";
import {currentProject} from "../../../../../store/project/project.seletors";

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent {

  currentProject$: Observable<IProject | null> = this.store.select(currentProject) ;

  constructor(
    private readonly store: Store<{project: ProjectStateModule}>,
  ) {
  }
}
