import { Component } from '@angular/core';
import {ProjectFacade} from "../../../../../facades/project.facade";
import {IProject} from "../../../../../core/interfaces/project";

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent {

  get project(): IProject {
    return this.projectFacade.getProject()
  }

  constructor(
    private readonly projectFacade: ProjectFacade,
  ) {
  }

  editProject() {

  }
}
