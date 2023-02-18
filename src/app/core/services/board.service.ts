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

  updateBoard(data: any): Observable<IBoard> {
    return this.put<IBoard>(`board/${data.id}`, data);
  }

  getBoard(id: number): Observable<IBoard> {
    return this.get<IBoard>(`board/${id}`);
  }

  deleteBoard(id: number): Observable<any> {
    return this.delete(`board/${id}`);
  }
}
