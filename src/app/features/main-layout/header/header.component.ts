import {Component, OnInit} from '@angular/core';
import {AuthFacade} from "../../../facades/auth.service";
import {ProjectService} from "../../../core/services/project.service";
import {IProject} from "../../../core/interfaces/project";
import {ProjectFacade} from "../../../facades/project.facade";
import {Store} from "@ngrx/store";
import {initCurrentProject, loadProjects, ProjectStateModule, setProject} from "../../../store";
import {currentProject, projects} from "../../../store/project/project.seletors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  projects = [];


  currentProject: IProject | null = null;
  projects$ = this.store.select(projects);

  get isAuth(): boolean {
    return this.authFacade.isAuth;
  }

  constructor(
    private store: Store<{ project: ProjectStateModule }>,
    private authFacade: AuthFacade,
  ) {
  }

  logout() {
    this.authFacade.logout();
  }

  selectProject(projectId: any) {
    this.store.dispatch(setProject({projectId}));
  }

  ngOnInit(): void {
    this.store.dispatch(loadProjects());
    this.store.dispatch(initCurrentProject());
    this.store.select(currentProject)
      .subscribe((project) => {
        this.currentProject = project;
      })
  }
}
