import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EpicService} from "../../../../../core/services/epic.service";
import {Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import {createEpic, EpicStateModel, getEpic, updateEpic} from "../../../../../store/epic";

@Component({
  selector: 'app-project-epic-add-edit',
  templateUrl: './project-epic-add-edit.component.html',
  styleUrls: ['./project-epic-add-edit.component.scss']
})
export class ProjectEpicAddEditComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  })

  sub$ = new Subject();

  epicId!: number;

  constructor(
    private store: Store<{ epic: EpicStateModel }>,
    private route: ActivatedRoute,
  ) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.epicId = +params['id'];
        this.getEpic(this.epicId)
      }
    })
  }

  save() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return;
    }

    if (this.epicId) {
      this.store.dispatch(updateEpic({epic: this.form.value}))
    } else {
      this.store.dispatch(createEpic({epic: this.form.value}))
    }
  }

  private getEpic(id: number) {
    this.store.select(getEpic, {epicId: id})
      .pipe(takeUntil(this.sub$))
      .subscribe(res => {
        if (!res) {
          return;
        }
        this.form.patchValue(res)
      })
  }

  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete()
  }
}
