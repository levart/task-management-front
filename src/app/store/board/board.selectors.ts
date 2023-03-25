import {createSelector} from "@ngrx/store";
import {BoardStateModule} from "./board.reducer";
import {IBoard} from "../../core/interfaces/board";

export const getBoards = createSelector(
  (state: any) => state.app.board.boards,
  (state) => state
)

export const getBoard = createSelector(
  (state: any) => state.app.board.boards,
  (state: IBoard[], props: { boardId: number }) => state.find((board) => board.id === +props.boardId)
)
