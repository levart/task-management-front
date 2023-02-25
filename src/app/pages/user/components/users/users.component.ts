import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ITask} from "../../../../core/interfaces/task";
import {of, Subject, switchMap, takeUntil} from "rxjs";
import {TaskService} from "../../../../core/services/task.service";
import {MatDialog} from "@angular/material/dialog";
import {IUser} from "../../../../core/interfaces/user";
import {UserService} from "../../../../core/services/user.service";
import {ConfirmationPopupComponent} from "../../../../shared/confirmation-popup/confirmation-popup.component";
import {UserAddEditComponent} from "../user-add-edit/user-add-edit.component";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  displayedColumns = ['id', 'fullName', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource<IUser>();

  sub$ = new Subject();
  pageIndex  = 1;
  total = 0;
  pageSize = 10;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers({
      page: this.pageIndex,
      limit: this.pageSize
    })
      .subscribe(users => {
        this.dataSource.data = users.data;
        this.total = users.totalCount;
      });
  }


  addUser(id?: number) {
    const dialogRef = this.dialog.open(UserAddEditComponent, {
      data: {
        userId: id
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUsers();
      }
    })

  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent);

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.sub$),
        switchMap((result) => {
          if (result) {
            return this.userService.deleteUser(id);
          }
          return of(null);
        })
      )
      .subscribe(result => {
        if (result) {
          this.getUsers();
        }
      });
  }

  pageEvent($event: PageEvent) {
    console.log($event)
    this.pageIndex = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getUsers()
  }
}
