import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthFacade} from "../../../facades/auth.service";
import {ProjectService} from "../../../core/services/project.service";
import {IProject} from "../../../core/interfaces/project";
import {select, Store} from "@ngrx/store";
import {initCurrentProject, loadProjects, loadProjectsSuccess, ProjectStateModule, setProject} from "../../../store";
import {currentProject, projects} from "../../../store/project/project.seletors";
import {tap} from "rxjs";
import {AuthStateModel, logout} from "../../../store/auth";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  projects = [];


  currentProject: IProject | null = null;
  projects$ = this.store.select(projects);

  get isAuth(): boolean {
    return this.authFacade.isAuth;
  }

  constructor(
    private store: Store<{ project: ProjectStateModule, auth: AuthStateModel }>,
    private authFacade: AuthFacade,
    private projectService: ProjectService,
  ) {
  }

  logout() {
    this.authFacade.logout();
    this.store.dispatch(logout());
  }

  selectProject(projectId: any) {
    this.store.dispatch(setProject({projectId}));
  }

  ngOnInit(): void {
    this.store.dispatch(loadProjects());
    this.store.dispatch(initCurrentProject());
    this.store.pipe(select(currentProject))
      .subscribe((project) => {
        this.currentProject = project;
      })
  }
}
