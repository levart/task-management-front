import {createReducer, on} from "@ngrx/store";
import {
  initCurrentProject,
  loadProjects,
  loadProjectsFailure,
  loadProjectsSuccess, loadProjectUsersSuccess,
  setProject
} from "./project.actions";
import {IProject} from "../../core/interfaces/project";
import {loadBoards} from "../board";
import {IUser} from "../../core/interfaces/user";

export interface ProjectStateModule {
  projects: IProject[];
  projectUsers: IUser[];
  currentProject: IProject | null;
}

const initialState: ProjectStateModule = {
  projects: [],
  projectUsers: [],
  currentProject: null
}


export const projectReducer = createReducer(
  initialState,
  on(loadProjects, state => state),
  on(loadProjectsSuccess, (state, action) => {
      return {
        ...state,
        projects: action.data
      }
    }
  ),
  on(loadProjectsFailure, (state, action) => state),
  on(setProject, (state, action) => {
    const project = state.projects.find((project) => project.id === +action.projectId);
    project && localStorage.setItem('project', JSON.stringify(project));
    return {
      ...state,
      currentProject: project || null
    }
  }),
  on(initCurrentProject, (state) => {
    const project = localStorage.getItem('project');
    return {
      ...state,
      currentProject: project ? JSON.parse(project) : null
    }
  }),
  on(loadProjectUsersSuccess, (state, action) => {
      return {
        ...state,
        projectUsers: action.users
      }
    }
  )
);
