import type { ChessBoard, PlayerTurn, PlayerMove, ChessSquare } from "types/Chess";

/**
  * Convert from game state to FEN string, read up here https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
  * I will not verify valid board positions, if you fuck up board it's skill issue
  */
export default function(
  board: ChessBoard,
  halfmoveClock: number,
  moveHistory: PlayerMove[],
  playerMove: PlayerTurn
): string {

  let FENData = {
    pieces: "",
    playerMove: playerMove,
    castleAvailability: "",
    enPassantSquare: "-",
    halfmoveClock: halfmoveClock,
    fullMoves: Math.floor(moveHistory.length / 2) + 1   // quick maths
  };


  // convert board to FEN board notation
  let boardData: string[] = []
  for (const rank of board) {
    let rankString = "";
    let emptyCounter = 0;

    for (const piece of rank) {
      if (!piece) {
        emptyCounter++;
      }
      else if (!emptyCounter) {
        rankString += piece;
      }
      else {
        rankString += emptyCounter + piece;
        emptyCounter = 0;
      }
    }

    // handle dangling empty spaces
    if (emptyCounter) {
      rankString += emptyCounter;
    }

    boardData.push(rankString);
  }
  FENData.pieces = boardData.join('/');

  // Handle empty move history edge case
  if (!moveHistory.length) {
    return `${FENData.pieces} ${FENData.playerMove} KQkq - ${FENData.halfmoveClock} ${FENData.fullMoves}`;
  }

  // Fill out EnPassant square if applicable
  const startSquare: ChessSquare = moveHistory.at(-1).start;
  const endSquare: ChessSquare = moveHistory.at(-1).end;
  const pieceMoved: ChessPiece = moveHistory.at(-1).piece;

  // Check if pawn moved and then check start and end ranks before assigning enPassant Square
  if (pieceMoved.toLowerCase() === 'p' && (startSquare[1] === '2' && endSquare[1] == '4' || startSquare[1] === '7' && endSquare[1] == '5')) {
    FENData.enPassantSquare = (pieceMoved === 'P') ? 
      `${endSquare[0]}3` :
      `${endSquare[0]}6`;
  }

  // Fill out castle availability
  let wKingSide = true;
  let wQueenSide = true;
  let bKingSide = true;
  let bQueenSide = true;
  for (const move of moveHistory) {
    // early break if all flags tripped
    if (!wKingSide && !wQueenSide && !bKingSide && !bQueenSide) break;

    switch (move.piece) {
      case 'K':
        wKingSide = false;
        wQueenSide = false;
        break;

      case 'R':
        if (move.start[0] === 'a') {
          wQueenSide = false;
        }
        else if (move.start[0] === 'h') {
          wKingSide = false;
        }
        break;

      case 'k':
        bKingSide = false;
        bQueenSide = false;
        break;

      case 'r':
        if (move.start[0] === 'a') {
          bQueenSide = false;
        }
        else if (move.start[0] === 'h') {
          bKingSide = false;
        }
        break
    }
  }
  if (!wKingSide && !wQueenSide && !bKingSide && !bQueenSide) {
    FENData.castleAvailability = '-';
  }
  else {
    FENData.castleAvailability = `${wKingSide ? 'K' : ''}${wQueenSide ? 'Q' : ''}${bKingSide ? 'k' : ''}${bQueenSide ? 'q' : ''}`;
  }

  // Construct FEN string: '<Board> <Player Turn> <Castle Availability> <En Passant Square> <Halfmove Clock> <Fullmove Number>'
  return `${FENData.pieces} ${FENData.playerMove} ${FENData.castleAvailability} ${FENData.enPassantSquare} ${FENData.halfmoveClock} ${FENData.fullMoves}`
}
