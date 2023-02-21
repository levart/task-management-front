import {Component, OnInit} from '@angular/core';
import {BoardService} from "../../core/services/board.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  boards$ = this.boardService.getBoards();

  boardId: number | null = null;

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    // this.route.url.subscribe(url => {
    //   console.log(url)
    // })
  }




}
