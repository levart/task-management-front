import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ETaskStatus} from "../../../../../core/enums/task-status.enum";
import {BoardService} from "../../../../../core/services/board.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-board-add-edit',
  templateUrl: './board-add-edit.component.html',
  styleUrls: ['./board-add-edit.component.scss']
})
export class BoardAddEditComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    position: new FormControl(1, Validators.required),
    description: new FormControl(null, Validators.required),
    columns: new FormArray([], Validators.required),
  })
  taskStatuses = Object.values(ETaskStatus);

  get columnsFormArray() {
    return this.form.get('columns') as FormArray;
  }

  constructor(
    private readonly boardService: BoardService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addColumn() {
    this.columnsFormArray.push(new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      position: new FormControl(this.columnsFormArray.length + 1, Validators.required),
      taskStatus: new FormControl(ETaskStatus.ToDo, Validators.required)
    }, Validators.required));
  }


  save() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value)

    this.boardService.createBoard(this.form.value)
      .subscribe( res => {
        console.log(res)
        this.router.navigate(['/projects/setting/boards']).then()
      })
  }
}
