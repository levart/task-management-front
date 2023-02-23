import {Component, OnInit} from '@angular/core';
import {BoardService} from "../../../core/services/board.service";
import {ActivatedRoute} from "@angular/router";
import {Column, IBoard} from "../../../core/interfaces/board";
import {ITask} from "../../../core/interfaces/task";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {TaskAddEditComponent} from "../task-add-edit/task-add-edit.component";
import {TaskService} from "../../../core/services/task.service";

import * as _ from 'lodash';

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
    private taskService: TaskService,
    private route: ActivatedRoute,
    public dialog: MatDialog
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
      this.getTasks()
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

  addTask(column: Column) {
    const  doalogRef = this.dialog.open(TaskAddEditComponent, {
      width: '1000px',
      data: {
        boardId: this.boardId,
        column: column
      },
    });

    doalogRef.afterClosed().subscribe((task: ITask) => {
      if (task) {
        this.getTasks()
      }
    })
  }

  private getTasks() {
    this.taskService.getTasks(this.boardId).subscribe(tasks => {
      console.log(tasks)
      this.tasks = _.groupBy(tasks, 'boardColumnId')
      console.log(this.tasks)
      // this.tasks = tasks
    })
  }
}
