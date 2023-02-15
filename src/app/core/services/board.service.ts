import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {IBoard} from "../interfaces/board";

@Injectable({
  providedIn: 'root'
})
export class BoardService extends BaseService{

  getBoards(): Observable<IBoard[]> {
    return this.get<IBoard[]>('board');
  }

  createBoard(data: any): Observable<IBoard> {
    return this.post<IBoard>('board', data);
  }
}
