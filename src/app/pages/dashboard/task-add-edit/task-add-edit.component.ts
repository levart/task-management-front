import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../../core/services/task.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Column} from "../../../core/interfaces/board";
import {Observable, shareReplay, Subject, takeUntil} from "rxjs";
import {IssueTypeService} from "../../../core/services/issue-type.service";
import {EpicService} from "../../../core/services/epic.service";
import {IEpic} from "../../../core/interfaces/epic";
import {IIssueType} from "../../../core/interfaces/issue-type";
import {IUser} from "../../../core/interfaces/user";
import {ProjectService} from "../../../core/services/project.service";

@Component({
  selector: 'app-task-add-edit',
  templateUrl: './task-add-edit.component.html',
  styleUrls: ['./task-add-edit.component.scss']
})
export class TaskAddEditComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    issueTypeId: new FormControl(null, Validators.required),
    epicId: new FormControl(null),
    priority: new FormControl(null, Validators.required),
    assigneeId: new FormControl(null),
    reporterId: new FormControl(null, Validators.required),
    boardId: new FormControl(null, Validators.required),
    boardColumnId: new FormControl(null, Validators.required),
    isBacklog: new FormControl(false, Validators.required),
    taskStatus: new FormControl(this.data.column?.taskStatus, Validators.required),
    taskProperty: new FormArray([])
  })


  sub$ = new Subject();
  types$: Observable<IIssueType[]> = this.issueTypeService.getIssueTypes();
  epics$: Observable<IEpic[]> = this.epicService.getEpics();
  users$: Observable<IUser[]> = this.projectService.getProjectUsers()
    .pipe(shareReplay(2));

  priorities: { id: 'LOW' | 'MEDIUM' | 'HIGH', name: string }[] = [
    {id: 'LOW', name: 'Low'},
    {id: 'MEDIUM', name: 'Medium'},
    {id: 'HIGH', name: 'High'},
  ]


  get taskProperty() {
    return this.form.get('taskProperty') as FormArray;
  }


  constructor(
    private taskService: TaskService,
    private issueTypeService: IssueTypeService,
    private epicService: EpicService,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<TaskAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskId: number, boardId: number, column: Column }
  ) {
  }

  ngOnInit(): void {

    if (this.data.taskId) {
      this.getTask(this.data.taskId)
    } else {
      this.form.get('issueTypeId')?.valueChanges
        .pipe(takeUntil(this.sub$))
        .subscribe((issueTypeId: number) => {
          this.getIssueTypeProperties(issueTypeId)
        })
    }
    if (this.data.boardId) {
      this.form.patchValue({boardId: this.data.boardId})
    }

    if (this.data.column) {
      this.form.patchValue({boardColumnId: this.data.column.id})
    }


  }

  getIssueTypeProperties(issueTypeId: number) {
    this.issueTypeService.getIssueType(issueTypeId)
      .pipe(takeUntil(this.sub$))
      .subscribe(res => {
        this.taskProperty.clear();
        res.issueTypeColumns.forEach(property => {
          this.taskProperty.push(new FormGroup({
            id: new FormControl(null),
            name: new FormControl(property.name),
            filedName: new FormControl(property.filedName),
            value: new FormControl(null, property.isRequired ? Validators.required : null),
            isRequired: new FormControl(property.isRequired),
          }))
        })
      })
  }


  private getTask(taskId: number) {
    this.taskService.getTask(taskId)
      .pipe(takeUntil(this.sub$))
      .subscribe(res => {
        this.form.patchValue(res)
        res.taskProperty.forEach(property => {
          this.taskProperty.push(new FormGroup({
            id: new FormControl(property.id),
            name: new FormControl(property.name, Validators.required),
            filedName: new FormControl(property.filedName, Validators.required),
            value: new FormControl(property.value, Validators.required),
            isRequired: new FormControl(property.isRequired, Validators.required),
          }))
        })
      })
  }


  save() {
    console.log(this.form)
    this.form.markAllAsTouched()
    if (this.form.invalid) return;

    if (this.data.taskId) {
      this.taskService.updateTask(this.data.taskId, this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe(res => {
          this.dialogRef.close(res)
        })
    } else {
      this.taskService.createTask(this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe(res => {
          this.dialogRef.close(res)
        })
    }
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
