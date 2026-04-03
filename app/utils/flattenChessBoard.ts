import type { ChessBoard, FlatChessBoard } from "types/Chess";

export default function(board: ChessBoard): FlatChessBoard {
  return board.flat()
}
