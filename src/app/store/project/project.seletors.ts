import {createSelector} from "@ngrx/store";
import {IProject} from "../../core/interfaces/project";

export const currentProject = createSelector(
  (state: any) => state.app.project.currentProject,
  (currentProject) => currentProject
)

export const projects = createSelector(
  (state: any) => state.app.project.projects,
  (projects) => projects
)

export const getProject = createSelector(
  (state: any) => state.app.project.projects,
  (projects: IProject[], props: {projectId: number}) => projects.find((project) => project.id === +props.projectId)
)


export const projectUsers = createSelector(
  (state: any) => state.app.project.projectUsers,
  (projectUsers) => projectUsers
)
