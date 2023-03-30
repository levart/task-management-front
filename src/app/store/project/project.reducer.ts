import {createReducer, on} from "@ngrx/store";
import {
  initCurrentProject,
  loadProjects,
  loadProjectsFailure,
  loadProjectsSuccess, loadProjectUsersSuccess,
  setProject, setProjectSuccess
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
        projects: action.projects
      }
    }
  ),
  on(loadProjectsFailure, (state, action) => state),
  on(setProjectSuccess, (state, action) => {
    return {
      ...state,
      currentProject: action.project
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
