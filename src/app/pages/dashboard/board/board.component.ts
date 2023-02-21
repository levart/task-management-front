import {Component, OnInit} from '@angular/core';
import {BoardService} from "../../../core/services/board.service";
import {ActivatedRoute} from "@angular/router";
import {IBoard} from "../../../core/interfaces/board";
import {ITask} from "../../../core/interfaces/task";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit{
  boardId!: number;

  board: IBoard = {} as IBoard;
  tasks: any = {
    6: [
      {
        id: 1,
        title: 'Task 1',
      },
      {
        id: 2,
        title: 'Task 2',
      },
      {
        id: 3,
        title: 'Task 3',
      }
    ],
    7: [],
    8: [],
    9: [],
    10: [],
  }

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.boardId = +params['id']
        this.getBoard()
      }
    })
  }


  getBoard() {
    this.boardService.getBoard(this.boardId).subscribe(board => {
      console.log(board)
      this.board = board
    })
  }


  drop(event: CdkDragDrop<any>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addTask(id: number) {
    
  }
}
