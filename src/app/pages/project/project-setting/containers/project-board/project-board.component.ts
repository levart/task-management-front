import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoardService} from "../../../../../core/services/board.service";
import {Observable, of, Subject, switchMap, takeUntil} from "rxjs";
import {IBoard} from "../../../../../core/interfaces/board";
import {DataSource} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {ConfirmationPopupComponent} from "../../../../../shared/confirmation-popup/confirmation-popup.component";
import {MatDialog} from "@angular/material/dialog";

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
    private boardService: BoardService,
    public dialog: MatDialog,
  ) {

  }


  ngOnInit(): void {
    this.getBoards();
  }

  getBoards() {
    this.boardService.getBoards()
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
        switchMap((result) => {
          if (result) {
            return this.boardService.deleteBoard(id);
          }
          return of(null);
        })
      )
      .subscribe(result => {
        if (result) {
          this.getBoards();
        }
      });
  }
}
