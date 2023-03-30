import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {IIssueType} from "../../../../../core/interfaces/issue-type";
import {of, Subject, switchMap, takeUntil, tap} from "rxjs";
import {IssueTypeService} from "../../../../../core/services/issue-type.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationPopupComponent} from "../../../../../shared/confirmation-popup/confirmation-popup.component";
import {EpicService} from "../../../../../core/services/epic.service";
import {IEpic} from "../../../../../core/interfaces/epic";
import {currentProject} from "../../../../../store/project/project.seletors";
import {select, Store} from "@ngrx/store";
import {ProjectStateModule} from "../../../../../store";
import {deleteEpic, EpicStateModel, getEpics, loadEpics} from "../../../../../store/epic";

@Component({
  selector: 'app-project-epics',
  templateUrl: './project-epics.component.html',
  styleUrls: ['./project-epics.component.scss']
})
export class ProjectEpicsComponent {
  displayedColumns = ['id', 'name', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<IEpic>();
  sub$ = new Subject();

  constructor(
    private store: Store<{ project: ProjectStateModule, epic: EpicStateModel }>,
    public dialog: MatDialog,
  ) {

  }


  ngOnInit(): void {
    this.getEpics();
    this.store.pipe(select(currentProject))
      .subscribe((project) => {
        if (project) {
          this.store.dispatch(loadEpics())
        }
      })

  }

  getEpics() {
    this.store.select(getEpics)
      .pipe(takeUntil(this.sub$))
      .subscribe(epics => {
        this.dataSource.data = epics;
      });
  }


  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent);

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.sub$),
        tap((result) => {
          if (result) {
            this.store.dispatch(deleteEpic({epicId: id}));
          }
        })
      )
      .subscribe();
  }
}
