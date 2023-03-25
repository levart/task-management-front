import {Component, OnInit} from '@angular/core';
import {BoardService} from "../../core/services/board.service";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {BoardStateModule, getBoards} from "../../store";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  boards$ = this.store.select(getBoards);

  boardId: number | null = null;

  constructor(
    private store: Store<{ board: BoardStateModule }>,
  ) {
  }

  ngOnInit(): void {
    // this.route.url.subscribe(url => {
    //   console.log(url)
    // })
  }




}
