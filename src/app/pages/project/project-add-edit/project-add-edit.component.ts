import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../../core/services/project.service";
import {Subject, switchMap, takeUntil, tap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProjectFacade} from "../../../facades/project.facade";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonModule} from "@angular/common";

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
    private readonly projectService: ProjectService,
    private readonly projectFacade: ProjectFacade,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.projectId = +params['id'];
        this.projectService.getProject(+params['id']).subscribe(res => {
          this.form.patchValue(res)
        })
      }
    })
  }

  save() {
    this.form.markAllAsTouched()

    if (this.form.invalid) {
      return;
    }

    if (this.projectId) {
      this.projectService.updateProject(this.form.value)
        .pipe(
          takeUntil(this.sub$),
          tap((res) => this.projectFacade.setProject(res.id)),
          switchMap(() => this.projectFacade.getMyProjects$())
        )
        .subscribe(res => {

          this._snackBar.open('Project updated', 'Close', {
            duration: 2000,
          })

          this.router.navigate(['/projects/setting']).then();
        });
      return;
    } else {
      this.projectService.createProject(this.form.value)
        .pipe(
          takeUntil(this.sub$),
          tap((res) => this.projectFacade.setProject(res.id)),
          switchMap(() => this.projectFacade.getMyProjects$())
        )
        .subscribe(res => {

          this._snackBar.open('Project created', 'Close', {
            duration: 2000,
          })

          this.router.navigate(['/projects/setting']).then();
        });
    }
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
