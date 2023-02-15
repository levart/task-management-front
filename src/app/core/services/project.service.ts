import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {PaginationResponse} from "../interfaces/pagination-response";
import {IProject} from "../interfaces/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService{

  getProjects(): Observable<PaginationResponse<IProject>> {
    return this.get<PaginationResponse<IProject>>('project');
  }

  getAllProjects(): Observable<IProject[]> {
    return this.get<IProject[]>('project/all');
  }

  getMyProjects(): Observable<IProject[]> {
    return this.get<IProject[]>('project/my');
  }

  getProject(id: number): Observable<IProject> {
    return this.get<IProject>(`project/${id}`);
  }

  createProject(project: IProject): Observable<IProject> {
    return this.post<IProject>('project', project);
  }

  updateProject(project: IProject): Observable<IProject> {
    return this.put<IProject>(`project/${project.id}`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.delete(`project/${id}`);
  }
}
