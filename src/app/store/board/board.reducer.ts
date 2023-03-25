import {createReducer, on} from "@ngrx/store";
import {IBoard} from "../../core/interfaces/board";
import {loadBoards, loadBoardsFailure, loadBoardsSuccess} from "./board.actions";

export interface BoardStateModule {
  boards: IBoard[];
}

const initialState: BoardStateModule = {
  boards: [],
}


export const boardReducer = createReducer(
  initialState,
  on(loadBoards, state => {
    return state
  }),
  on(loadBoardsSuccess, (state, action) => {
    console.log(action)
      return {
        ...state,
        boards: action.data
      }
    }
  ),
  on(loadBoardsFailure, (state, action) => state),
)
