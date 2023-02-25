import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {Observable, shareReplay, Subject, takeUntil} from "rxjs";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {IIssueType} from "../../core/interfaces/issue-type";
import {IEpic} from "../../core/interfaces/epic";
import {IUser} from "../../core/interfaces/user";
import {TaskService} from "../../core/services/task.service";
import {IssueTypeService} from "../../core/services/issue-type.service";
import {EpicService} from "../../core/services/epic.service";
import {ProjectService} from "../../core/services/project.service";
import {Column, IBoard} from "../../core/interfaces/board";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {BoardService} from "../../core/services/board.service";

@Component({
  selector: 'app-task-add-edit',
  templateUrl: './task-add-edit.component.html',
  styleUrls: ['./task-add-edit.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDividerModule,],
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
    boardId: new FormControl(null),
    boardColumnId: new FormControl(null),
    isBacklog: new FormControl(false, Validators.required),
    taskStatus: new FormControl(this.data.column?.taskStatus || 'ToDo', Validators.required),
    taskProperty: new FormArray([])
  })


  sub$ = new Subject();
  boards$: Observable<IBoard[]> = this.boardService.getBoards();
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
    private boardService: BoardService,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<TaskAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskId: number, boardId: number, column: Column, isBacklog: boolean  }
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

    if (this.data.isBacklog) {
      this.form.patchValue({isBacklog: this.data.isBacklog})
      this.form.get('boardId')?.clearValidators()
      this.form.get('boardColumnId')?.clearValidators()
    } else {
      this.form.get('boardId')?.setValidators(Validators.required)
      this.form.get('boardColumnId')?.setValidators(Validators.required)
    }
    this.form.get('boardId')?.updateValueAndValidity()
    this.form.get('boardColumnId')?.updateValueAndValidity()
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
