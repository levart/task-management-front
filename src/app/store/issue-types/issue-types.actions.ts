import {createAction} from "@ngrx/store";

export const loadIssueTypes = createAction(
  '[IssueTypes] Load IssueTypes'
);

export const loadIssueTypesSuccess = createAction(
  '[IssueTypes] Load IssueTypes Success',
  (issueTypes: any) => issueTypes
);

export const loadIssueTypesFailure = createAction(
  '[IssueTypes] Load IssueTypes Failure',
  (error: any) => error
);

export const createIssueType = createAction(
  '[IssueTypes] Create IssueType',
  (issueType: any) => issueType
);

export const updateIssueType = createAction(
  '[IssueTypes] Update IssueType',
  (issueType: any) => issueType
);

export const deleteIssueType = createAction(
  '[IssueTypes] Delete IssueType',
  (issueType: any) => issueType
);
