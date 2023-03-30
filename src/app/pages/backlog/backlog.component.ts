import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import { RouterModule} from "@angular/router";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {IIssueType} from "../../core/interfaces/issue-type";
import {of, Subject, switchMap, takeUntil} from "rxjs";
import {IssueTypeService} from "../../core/services/issue-type.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ConfirmationPopupComponent} from "../../shared/confirmation-popup/confirmation-popup.component";
import {ITask} from "../../core/interfaces/task";
import {TaskService} from "../../core/services/task.service";
import {TaskAddEditComponent} from "../../shared/task-add-edit/task-add-edit.component";
import {Store, StoreModule} from "@ngrx/store";
import {backlogReducer, BacklogStateModel} from "./store/backlog.reducer";
import {loadBacklogTasks} from "./store/backlog.actions";

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'issueType', 'epic', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource<ITask>();

  sub$ = new Subject();

  constructor(
    private store: Store<{backlog: BacklogStateModel}>,
    private taskService: TaskService,
    public dialog: MatDialog,
  ) {

  }


  ngOnInit(): void {
    this.store.select((state) => state.backlog)
      .subscribe((backlog) => {
        this.dataSource.data = backlog.tasks;
      })
    this.loadBacklog()
  }

  loadBacklog() {
    this.store.dispatch(loadBacklogTasks())
  }

  addBoard() {
    console.log('add board');
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }

  deleteBoard(id: number) {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent);

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.sub$),
        switchMap((result) => {
          if (result) {
            return this.taskService.deleteTask(id);
          }
          return of(null);
        })
      )
      .subscribe(result => {
        if (result) {
          this.loadBacklog();
        }
      });
  }

  addTask(taskId?: number) {
    const  doalogRef = this.dialog.open(TaskAddEditComponent, {
      width: '1000px',
      data: {
        isBacklog: true,
        taskId,
      },
    });

    doalogRef.afterClosed().subscribe((task: ITask) => {
      if (task) {
        this.loadBacklog()
      }
    })
  }
}
