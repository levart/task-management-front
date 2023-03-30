import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../../../core/services/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoleService} from "../../../../core/services/role.service";
import {Observable} from "rxjs";
import {IRole} from "../../../../core/interfaces/role";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../../../../core/interfaces/user";
import {UserStateModel} from "../../store/user.reducer";
import {Store} from "@ngrx/store";
import {updateUserRoles} from "../../store/user.actions";
import {Actions} from "@ngrx/effects";

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit{
  form: FormGroup = new FormGroup({
    roles: new FormControl([], Validators.required)
  });

  roles$: Observable<IRole[]> = this.roleService.getAllRoles();

  constructor(
    private store: Store<{ user: UserStateModel }>,
    private action$: Actions,
    @Inject(MAT_DIALOG_DATA) public data: { user: IUser },
    public dialogRef: MatDialogRef<UserRoleComponent>,
    private roleService: RoleService,
  ) { }

  ngOnInit(): void {
    if (this.data.user.roles) {
      this.form.patchValue({
        roles: this.data.user.roles.map((r:IRole) => r.id)
      })
    }
    this.action$.subscribe((res) => {
      this.dialogRef.close(res);
    })
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const {roles} = this.form.value;
    this.store.dispatch(updateUserRoles({
      userId: this.data.user.id,
      roleIds: roles
    }));
  }
}
