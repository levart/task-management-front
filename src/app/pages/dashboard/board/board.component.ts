import {Component, OnInit} from '@angular/core';
import {BoardService} from "../../../core/services/board.service";
import {ActivatedRoute} from "@angular/router";
import {Column, IBoard} from "../../../core/interfaces/board";
import {ITask} from "../../../core/interfaces/task";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {TaskService} from "../../../core/services/task.service";

import * as _ from 'lodash';
import {TaskAddEditComponent} from "../../../shared/task-add-edit/task-add-edit.component";
import {Store} from "@ngrx/store";
import {getBoardTasks, loadTasks, TasksEffects} from "../../../store/tasks";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit{
  boardId!: number;

  board: IBoard = {} as IBoard;
  tasks: any = {}

  constructor(
    private store: Store<{task: TasksEffects}>,
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

    this.store.select(getBoardTasks)
      .subscribe( res => {
        this.tasks = res
      })
  }


  getBoard() {
    this.boardService.getBoard(this.boardId).subscribe(board => {
      this.board = board
      this.getTasks()
    })
  }


  drop(event: CdkDragDrop<any>, column: Column) {
    console.log(event.container)

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const tasks: ITask[] = event.container.data.map((task: ITask, index: number) => {
        return {
          ...task,
          taskStatus: column.taskStatus,
          boardColumnId: column.id,
        }
      })

      this.tasks[column.id] = tasks
      const currentTask = tasks[event.currentIndex]
      console.log(currentTask)
      this.taskService.updateTask(currentTask.id, currentTask).subscribe(task => {

        console.log(task)
        this.getTasks()
      })
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
    this.store.dispatch(loadTasks({boardId: this.boardId}))
  }

  viewTask(task: ITask, column: Column) {
    const  doalogRef = this.dialog.open(TaskAddEditComponent, {
      width: '1000px',
      data: {
        boardId: this.boardId,
        column: column,
        taskId: task.id
      },
    });
    doalogRef.afterClosed().subscribe((task: ITask) => {
      if (task) {
        this.getTasks()
      }
    })
  }
}
