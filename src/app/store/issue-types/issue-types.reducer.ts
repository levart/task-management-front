import {createReducer, on} from "@ngrx/store";
import {loadIssueTypes, loadIssueTypesFailure, loadIssueTypesSuccess} from "./issue-types.actions";
import {IIssueType} from "../../core/interfaces/issue-type";

export interface IssueTypesStateModel {
  issueTypes: IIssueType[];
}

const initialState: IssueTypesStateModel = {
  issueTypes: [],
}

export const issueTypesReducer = createReducer(
  initialState,
  on(loadIssueTypes, (state) => ({...state})),
  on(loadIssueTypesSuccess, (state, action) => {
    console.log(action);
    return {
      ...state,
      issueTypes: action.issueTypes
    }
  }),
  on(loadIssueTypesFailure, (state, {error}) => ({...state, error}))
);
