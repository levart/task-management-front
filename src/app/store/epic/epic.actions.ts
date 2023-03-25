import {createAction, props} from "@ngrx/store";

export const loadEpics = createAction(
  '[Epic] Load Epics'
);

export const loadEpicsSuccess = createAction(
  '[Epic] Load Epics Success',
  props<{ data: any }>()
);

export const loadEpicsFailure = createAction(
  '[Epic] Load Epics Failure',
  props<{ error: any }>()
);

export const createEpic = createAction(
  '[Epic] Create Epic',
  props<{ epic: any }>()
);

export const updateEpic = createAction(
  '[Epic] Update Epic',
  props<{ epic: any }>()
);

export const deleteEpic = createAction(
  '[Epic] Delete Epic',
  props<{ epicId: number }>()
);
