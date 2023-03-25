import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoardService} from "../../../../../core/services/board.service";
import {Observable, of, Subject, switchMap, takeUntil, tap} from "rxjs";
import {IBoard} from "../../../../../core/interfaces/board";
import {DataSource} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {ConfirmationPopupComponent} from "../../../../../shared/confirmation-popup/confirmation-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {BoardStateModule, deleteBoard, getBoards, loadBoards, ProjectStateModule} from "../../../../../store";
import {currentProject} from "../../../../../store/project/project.seletors";

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'name', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource<IBoard>();

  sub$ = new Subject();

  constructor(
    private store: Store<{ project: ProjectStateModule, board: BoardStateModule }>,
    private boardService: BoardService,
    public dialog: MatDialog,
  ) {

  }


  ngOnInit(): void {
    this.getBoards()
    this.store.select(currentProject)
      .pipe(takeUntil(this.sub$))
      .subscribe((project) => {
        if (project) {
          this.store.dispatch(loadBoards());
        }
      })

  }

  getBoards() {
    this.store.select(getBoards)
      .pipe(takeUntil(this.sub$))
      .subscribe(boards => {
        this.dataSource.data = boards;
      });
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
        tap((result) => {
          if (result) {
            return this.store.dispatch(deleteBoard({boardId: id}));
          }
        })
      )
      .subscribe();
  }
}
