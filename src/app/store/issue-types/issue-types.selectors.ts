import {createSelector} from "@ngrx/store";
import {IIssueType} from "../../core/interfaces/issue-type";

export const getIssueTypes = createSelector(
  (state: any) => state.app.issueTypes.issueTypes,
  (issueTypes) => issueTypes
)


export const getIssueType = createSelector(
  (state: any) => state.app.issueTypes.issueTypes,
  (issueTypes: IIssueType[], props: {issueTypeId: number}) => issueTypes.find(issueType => issueType.id === props.issueTypeId)
)

