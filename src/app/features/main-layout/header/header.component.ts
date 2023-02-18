import {Component, OnInit} from '@angular/core';
import {AuthFacade} from "../../../facades/auth.service";
import {ProjectService} from "../../../core/services/project.service";
import {IProject} from "../../../core/interfaces/project";
import {ProjectFacade} from "../../../facades/project.facade";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  projects = [];


  currentProject?: IProject = this.projectFacade.getProject();
  projects$ = this.projectFacade.myProjects$;

  get isAuth(): boolean {
    return this.authFacade.isAuth;
  }

  constructor(
    private authFacade: AuthFacade,
    private projectFacade: ProjectFacade,
    private projectService: ProjectService,
  ) {
  }

  logout() {
    this.authFacade.logout();
  }

  selectProject(projectId: any) {
    this.projectFacade.setProject(projectId);
  }

  getMyProjects() {
    this.projectFacade.getMyProjects$().subscribe();
  }

  ngOnInit(): void {
    this.getMyProjects();
  }
}
