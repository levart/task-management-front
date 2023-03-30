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
import {UserRoleComponent} from "../user-role/user-role.component";
import {Store} from "@ngrx/store";
import {UserStateModel} from "../../store/user.reducer";
import {deleteUser, loadUsers} from "../../store/user.actions";
import {isLoading, users, userTotal} from "../../store/user.selectors";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  totalUsers$ = this.store.select(userTotal);
  isLoading$ = this.store.select(isLoading);

  displayedColumns = ['id', 'fullName', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource<IUser>();

  sub$ = new Subject();
  pageIndex  = 0;
  total = 0;
  pageSize = 10;

  constructor(
    private store: Store<{user: UserStateModel}>,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.loadUsers()
    this.store.select(users)
      .pipe(
        takeUntil(this.sub$)
      )
      .subscribe((users) => {
        console.log(users)
        this.dataSource.data = users;
      })
  }

  loadUsers() {
    this.store.dispatch(loadUsers({
      page: this.pageIndex + 1,
      limit: this.pageSize
    }))
  }


  addUser(id?: number) {
    const dialogRef = this.dialog.open(UserAddEditComponent, {
      data: {
        userId: id
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
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
            this.store.dispatch(deleteUser({id}))
            return of(result)
          }
          return of(null);
        })
      )
      .subscribe(result => {
        if (result) {
          this.loadUsers();
        }
      });
  }

  pageEvent($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.loadUsers()
  }

  setRole(user: IUser) {
    const dialogRef = this.dialog.open(UserRoleComponent, {
      data: {
        user: user,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    })
  }
}
