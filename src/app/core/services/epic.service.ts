import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {IEpic} from "../interfaces/epic";
import {PaginationResponse} from "../interfaces/pagination-response";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EpicService extends BaseService {


  getEpics(): Observable<IEpic[]> {
    return this.get<IEpic[]>(`epics`);
  }

  getEpic(id: number): Observable<IEpic> {
    return this.get<IEpic>(`epics/${id}`);
  }

  createEpic(epic: IEpic): Observable<IEpic> {
    return this.post<IEpic>(`epics`, epic);
  }

  updateEpic(epic: IEpic): Observable<IEpic> {
    return this.put<IEpic>(`epics/${epic.id}`, epic);
  }

  deleteEpic(id: number): Observable<any> {
    return this.delete(`epics/${id}`);
  }

}
