import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {IssueTypeService} from "../../core/services/issue-type.service";
import {
  createIssueType,
  loadIssueTypes,
  loadIssueTypesFailure,
  loadIssueTypesSuccess,
  updateIssueType
} from "./issue-types.actions";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {IIssueType} from "../../core/interfaces/issue-type";
import {Router} from "@angular/router";

@Injectable()
export class IssueTypesEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly issueTypeService: IssueTypeService,
    private router: Router,
  ) {
  }

  loadIssueTypes$ = createEffect(() => this.actions$.pipe(
      ofType(loadIssueTypes),
      switchMap(() => this.issueTypeService.getIssueTypes().pipe(
        tap((data: IIssueType[]) => console.log(data)),
          map((data: any) => loadIssueTypesSuccess({issueTypes: data})),
          catchError((error) => of(loadIssueTypesFailure({error})))
        )
      )
    )
  );

  createIssueType$ = createEffect(() => this.actions$.pipe(
      ofType(createIssueType),
      switchMap((action) => this.issueTypeService.createIssueType(action.issueType).pipe(
          map((data: any) => {
            this.router.navigate(['/projects/setting/issue-types']).then()
            return loadIssueTypes()
          }),
          catchError((error) => of(loadIssueTypesFailure({error})))
        )
      )
    )
  );


  updateIssueType$ = createEffect(() => this.actions$.pipe(
      ofType(updateIssueType),
      switchMap((action) => this.issueTypeService.updateIssueType(action.issueType).pipe(
        map((data: any) => {
          this.router.navigate(['/projects/setting/issue-types']).then()
          return loadIssueTypes()
        }),
          catchError((error) => of(loadIssueTypesFailure({error})))
        )
      )
    )
  );
}
