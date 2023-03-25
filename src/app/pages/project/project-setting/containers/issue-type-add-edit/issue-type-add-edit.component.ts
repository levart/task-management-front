import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ETaskStatus} from "../../../../../core/enums/task-status.enum";
import {BoardService} from "../../../../../core/services/board.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EIssueTypes} from "../../../../../core/enums/issue-types.enum";
import {IssueTypeService} from "../../../../../core/services/issue-type.service";
import {Store} from "@ngrx/store";
import {createIssueType, getIssueType, IssueTypesStateModel, updateIssueType} from "../../../../../store";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-issue-type-add-edit',
  templateUrl: './issue-type-add-edit.component.html',
  styleUrls: ['./issue-type-add-edit.component.scss']
})
export class IssueTypeAddEditComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    icon: new FormControl(null, Validators.required),
    color: new FormControl(1, Validators.required),
    type: new FormControl(null, Validators.required),
    issueTypeColumns: new FormArray([], Validators.required),
  })
  issueTypes = Object.values(EIssueTypes);

  issueTypeId!: number;

  get columnsFormArray() {
    return this.form.get('issueTypeColumns') as FormArray;
  }

  sub$ = new Subject();

  constructor(
    private readonly store: Store<{ issueTypes: IssueTypesStateModel }>,
    private readonly issueTypeService: IssueTypeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.issueTypeId = +params['id'];
        this.getBoard()
      }
    })
  }

  getBoard() {
    this.store.select(getIssueType, {issueTypeId: this.issueTypeId})
      .pipe(takeUntil(this.sub$))
      .subscribe(res => {
        if (!res) {
          return
        }
        this.form.patchValue(res)
        res.issueTypeColumns.forEach(column => {
          this.columnsFormArray.push(new FormGroup({
            id: new FormControl(column.id),
            name: new FormControl(column.name, Validators.required),
            filedName: new FormControl(column.filedName, Validators.required),
            isRequired: new FormControl(column.isRequired, Validators.required)
          }, Validators.required));
        })
      })
  }

  addColumn() {
    this.columnsFormArray.push(new FormGroup({
      name: new FormControl(null, Validators.required),
      filedName: new FormControl(null, Validators.required),
      isRequired: new FormControl(false, Validators.required),
    }, Validators.required));
  }


  save() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return;
    }
    if (this.issueTypeId) {
      this.store.dispatch(updateIssueType({issueType: this.form.value}))
    } else {
      this.store.dispatch(createIssueType({issueType: this.form.value}))
    }


  }

  removeColumn(i: number) {
    this.columnsFormArray.removeAt(i);
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
