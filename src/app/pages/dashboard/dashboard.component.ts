import {Component, OnInit} from '@angular/core';
import {BoardService} from "../../core/services/board.service";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState, BoardStateModule, getBoards, loadBoards} from "../../store";
import {currentProject} from "../../store/project/project.seletors";
import {of, switchMap} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  currentProject$ = this.store.select(currentProject);
  boards$ = this.store.select(currentProject)
    .pipe(
      switchMap( (project) => {
        if(project) {
          return this.store.select(getBoards)
        }
        return of([])
      })
    );

  boardId: number | null = null;

  constructor(
    private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadBoards())
  }




}
