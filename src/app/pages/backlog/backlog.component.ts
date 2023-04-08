import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {of, Subject, switchMap, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationPopupComponent} from "../../shared/confirmation-popup/confirmation-popup.component";
import {ITask} from "../../core/interfaces/task";
import {TaskService} from "../../core/services/task.service";
import {TaskAddEditComponent} from "../../shared/task-add-edit/task-add-edit.component";
import {Store} from "@ngrx/store";
import {BacklogStateModel} from "./store/backlog.reducer";
import {loadBacklogTasks} from "./store/backlog.actions";
import {Meta, Title} from "@angular/platform-browser";

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
    private store: Store<{ backlog: BacklogStateModel }>,
    private taskService: TaskService,
    public dialog: MatDialog,
    private titleService: Title,
    private metaService: Meta
  ) {

  }


  ngOnInit(): void {
    this.titleService.setTitle('Backlog | ჩემი თასქ-მენეჯერი')
    this.metaService.addTags([
      {
        name: 'description',
        content: 'ჩემი თასქ-მენეჯერი ბექლოგი'
      },
      {
        name: 'keywords',
        content: 'ბექლოგი, თასქები, თასქ-მენეჯერი'
      },
      {
        name: 'robots',
        content: 'index, follow'
      },
      {
        name: 'og:title',
        content: 'ბექლოგი | ჩემი თასქ-მენეჯერი'
      },
      {
        name: 'og:description',
        content: 'ჩემი თასქ-მენეჯერი ბექლოგი'
      },
      {
        name: 'og:url',
        content: 'https://task-manager.ge/backlog'
      },
      {
        name: 'og:image',
        content: 'https://task-manager.ge/assets/images/logo.png'
      },
      {
        name: 'og:type',
        content: 'website'
      },
      {
        name: 'og:site_name',
        content: 'ჩემი თასქ-მენეჯერი'
      },
      {
        name: 'twitter:card',
        content: 'summary'
      },
      {
        name: 'twitter:title',
        content: 'ბექლოგი | ჩემი თასქ-მენეჯერი'
      },
      {
        name: 'twitter:description',
        content: 'ჩემი თასქ-მენეჯერი ბექლოგი'
      },
      {
        name: 'twitter:image',
        content: 'https://task-manager.ge/assets/images/logo.png'
      },
      {
        name: 'twitter:site',
        content: '@taskmanagerge'
      }
    ])
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
    const doalogRef = this.dialog.open(TaskAddEditComponent, {
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
