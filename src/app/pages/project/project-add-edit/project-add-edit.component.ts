import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../../core/services/project.service";
import {of, pipe, Subject, switchMap, takeUntil, tap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {State, Store} from "@ngrx/store";
import {createProject, loadProjects, ProjectStateModule, setProject, updateProject} from "../../../store";
import {IProject} from "../../../core/interfaces/project";
import {getProject} from "../../../store/project/project.seletors";

@Component({
  selector: 'app-project-add-edit',
  templateUrl: './project-add-edit.component.html',
  styleUrls: ['./project-add-edit.component.scss']
})
export class ProjectAddEditComponent implements OnDestroy, OnInit {


  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    abbreviation: new FormControl(null, Validators.required),
    color: new FormControl(null, Validators.required),
  });

  projectId!: number;

  sub$ = new Subject()

  constructor(
    private store: Store<{ project: ProjectStateModule }>,
    private readonly projectService: ProjectService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        takeUntil(this.sub$),
        switchMap((params: any) => {
            if (params['id']) {
              this.projectId = +params['id'];
              return this.store.select(getProject, {projectId: +params['id']})
            }

            return of(null);
          }
        )
      )
      .subscribe((params: any) => {
        if (params) {
          this.form.patchValue(params)
        }
        return
      })
  }

  save() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return;
    }
    if (this.projectId) {
      this.store.dispatch(updateProject({project: this.form.value}))
      return;
    } else {
      this.store.dispatch(createProject({project: this.form.value}))
    }
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
