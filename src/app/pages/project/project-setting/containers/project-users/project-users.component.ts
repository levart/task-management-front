import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {IBoard} from "../../../../../core/interfaces/board";
import {Observable, Subject, takeUntil} from "rxjs";
import {ProjectService} from "../../../../../core/services/project.service";
import {ProjectFacade} from "../../../../../facades/project.facade";
import {IUser} from "../../../../../core/interfaces/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../../core/services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {UserAddEditComponent} from "../../../../user/components/user-add-edit/user-add-edit.component";
import {Store} from "@ngrx/store";
import {loadProjectUsers, ProjectStateModule, setProjectUsers} from "../../../../../store";
import {currentProject, projectUsers} from "../../../../../store/project/project.seletors";

@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.scss']
})
export class ProjectUsersComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'firstName', 'lastName', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource<IBoard>();

  sub$ = new Subject();

  projectUserIds: number[] = [];

  chooseUserActive = false;
  userForm: FormGroup = new FormGroup({
    userId: new FormControl(null, [Validators.required])
  });

  users$: Observable<IUser[]> = this.userService.getAllUsers();

  get projectId() {
    return this.projectFacade.getProject().id;
  }

  constructor(
    private store: Store<{ project: ProjectStateModule }>,
    private projectService: ProjectService,
    private userService: UserService,
    private projectFacade: ProjectFacade,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getProjectUsers()
    this.store.select(currentProject)
      .subscribe((project) => {
        console.log(project)
        if (project) {
          this.store.dispatch(loadProjectUsers())
        }
      })
  }

  getProjectUsers() {
    this.store.select(projectUsers)
      .pipe(takeUntil(this.sub$))
      .subscribe(users => {
        if (!users) return;
        this.projectUserIds = users.map((user: IUser) => user.id);
        this.dataSource.data = users;
      })
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }


  delete(id: number) {
    const userIds = this.projectUserIds.filter((userId: number) => userId !== id);

    this.store.dispatch(setProjectUsers({
      projectId: this.projectId,
      userIds
    }))
  }

  chooseUser() {
    this.chooseUserActive = !this.chooseUserActive;
  }

  onSubmit() {
    const userIds = [...this.projectUserIds, this.userForm.value.userId];
    this.createUsers(userIds)
    this.chooseUser();
  }

  createUsers(userIds: number[]) {
    this.store.dispatch(setProjectUsers({
      projectId: this.projectId,
      userIds
    }))

  }

  addNewUser() {
    const dialog = this.dialog.open(UserAddEditComponent);

    dialog.afterClosed()
      .pipe()
      .subscribe((result: IUser) => {
        if (result) {
          const userIds = [...this.projectUserIds, result.id];
          this.createUsers(userIds)
          this.chooseUserActive = false;
        }
      })
  }
}
