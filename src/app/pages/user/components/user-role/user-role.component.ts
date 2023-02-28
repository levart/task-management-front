import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../../../core/services/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoleService} from "../../../../core/services/role.service";
import {Observable} from "rxjs";
import {IRole} from "../../../../core/interfaces/role";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../../../../core/interfaces/user";

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
    @Inject(MAT_DIALOG_DATA) public data: { user: IUser },
    public dialogRef: MatDialogRef<UserRoleComponent>,
    private userService: UserService,
    private roleService: RoleService,
  ) { }

  ngOnInit(): void {
    if (this.data.user.roles) {
      this.form.patchValue({
        roles: this.data.user.roles.map((r:IRole) => r.id)
      })
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const {roles} = this.form.value;
    this.userService.updateUserRoles({
      userId: this.data.user.id,
      roleIds: roles
    })
      .subscribe(() => {
        this.dialogRef.close(true);
      })
  }
}
