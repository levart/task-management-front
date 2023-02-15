import { Component } from '@angular/core';
import {BoardService} from "../../../../../core/services/board.service";
import {Observable} from "rxjs";
import {IBoard} from "../../../../../core/interfaces/board";
import {DataSource} from "@angular/cdk/collections";

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent {

  boards$: Observable<IBoard[]> = this.boardService.getBoards();
  displayedColumns = ['id', 'name', 'description', 'position', 'createdAt'];

  constructor(
    private boardService: BoardService,
  ) {
  }

  addBoard() {
    console.log('add board');
  }
}
