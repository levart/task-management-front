import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../core/services/user.service";
import {UserStateModel} from "../../store/user.reducer";
import {ActionsSubject, Store} from "@ngrx/store";
import {getUserById} from "../../store/user.selectors";
import {createUser, createUserSuccess, loadUsers, updateUser} from "../../store/user.actions";
import {Actions, ofType} from "@ngrx/effects";
import {filter} from "rxjs";
import {UserEffects} from "../../store/user.effects";

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {


  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    mobileNumber: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    identityNumber: new FormControl(null),
  });

  constructor(
    private store: Store<{ user: UserStateModel }>,
    private action$: Actions,
    private userEffects: UserEffects,
    public dialogRef: MatDialogRef<UserAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    if (this.data.userId) {
      this.store.select(getUserById(this.data.userId))
        .subscribe((res) => {
          if (!res) return;
          this.form.patchValue(res);
        })
    }
    this.action$
      .pipe(
        ofType(createUserSuccess),
      )
      .subscribe((res) => {
        this.dialogRef.close(res);
      })
  }

  onSubmit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return
    }
    const {id, ...data} = this.form.value;
    if (id) {
      this.store.dispatch(updateUser({user: this.form.value}))
    } else {
      this.store.dispatch(createUser({user: this.form.value}))
    }

    // this.userService.createUser(this.form.value)
    //   .subscribe((res) => {
    //     this.dialogRef.close(res);
    //   })
  }
}
