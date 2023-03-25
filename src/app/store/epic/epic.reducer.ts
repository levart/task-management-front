import {createReducer, on} from "@ngrx/store";
import {loadEpics, loadEpicsFailure, loadEpicsSuccess} from "./epic.actions";
import {IEpic} from "../../core/interfaces/epic";

export interface EpicStateModel {
  epics: IEpic[]
}

const initialState: EpicStateModel = {
  epics: []
}

export const epicReducer = createReducer(
  initialState,
  on(loadEpics, state => state),
  on(loadEpicsSuccess, (state, action) => {
    return {
      ...state,
      epics: action.data
    }
  }),
  on(loadEpicsFailure, (state) => state)
);
