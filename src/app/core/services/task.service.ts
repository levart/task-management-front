import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {ITask} from "../interfaces/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService{

  getTask(id: number): Observable<ITask> {
    return this.get<ITask>(`task/${id}`)
  }

  getTasks(params = {}): Observable<ITask[]> {
    return this.get<ITask[]>(`task`, params )
  }

  createTask(data: any): Observable<ITask> {
    return this.post<ITask>(`task`, data)
  }

  updateTask(id: number, data: any): Observable<ITask> {
    return this.put<ITask>(`task/${id}`, data)
  }

  deleteTask(id: number): Observable<any> {
    return this.delete<ITask>(`task/${id}`)
  }
}
