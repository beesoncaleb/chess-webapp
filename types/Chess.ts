/**
  * Uses FEN notation to denote chess pieces
  * You can read more on it here https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
  */
export type ChessPiece = 
  "P" |
  "R" |
  "N" |
  "B" |
  "Q" |
  "K" |
  "p" |
  "r" |
  "n" |
  "b" |
  "q" |
  "k" ;

export type PlayerTurn = 'w' | 'b';

export type MoveFlags = "castle" | "check" | "checkmate" | "promotion" | "en passant";
export type PlayerMove = {
  start: ChessSquare;
  end: ChessSquare;
  turn: PlayerTurn;
  piece: ChessPiece;
  capture?: ChessPiece;
  flags?: MoveFlags;
  promotionPiece?: ChessPiece;
}

/**
  * Use Tuple types to define a Chessboard as a 2D array of Board Pieces
  * Board pieces are nullable ChessPieces because need way to store empty piece
  * Board is layed out from ranks 8 - 1 top to bottom
  * This is so that when flattened the flat chess board can just be inserted into a CSS grid layout and it will have the proper layout
  */
export type BoardPiece = ChessPiece | null;
export type ChessBoard = [
  /*                File: a     File: b     File: c     File: d     File: e     File: f     File: g     File: h     */ 
  /* Rank 8: */   [ BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece ],
  /* Rank 7: */   [ BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece ],
  /* Rank 6: */   [ BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece ],
  /* Rank 5: */   [ BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece ],
  /* Rank 4: */   [ BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece ],
  /* Rank 3: */   [ BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece ],
  /* Rank 2: */   [ BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece ],
  /* Rank 1: */   [ BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece ]
];

export type FlatChessBoard = [
  /*              File: a     File: b     File: c     File: d     File: e     File: f     File: g     File: h     */ 
  /* Rank 8: */   BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece,
  /* Rank 7: */   BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece,
  /* Rank 6: */   BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece,
  /* Rank 5: */   BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece,
  /* Rank 4: */   BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece,
  /* Rank 3: */   BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece,
  /* Rank 2: */   BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece,
  /* Rank 1: */   BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece, BoardPiece
];

// Manually define all piece strings
export type ChessSquare = 
  'a8' | 'b8' | 'c8' | 'd8' | 'e8' | 'f8' | 'g8' | 'h8' |
  'a7' | 'b7' | 'c7' | 'd7' | 'e7' | 'f7' | 'g7' | 'h7' |
  'a6' | 'b6' | 'c6' | 'd6' | 'e6' | 'f6' | 'g6' | 'h6' |
  'a5' | 'b5' | 'c5' | 'd5' | 'e5' | 'f5' | 'g5' | 'h5' |
  'a4' | 'b4' | 'c4' | 'd4' | 'e4' | 'f4' | 'g4' | 'h4' |
  'a3' | 'b3' | 'c3' | 'd3' | 'e3' | 'f3' | 'g3' | 'h3' |
  'a2' | 'b2' | 'c2' | 'd2' | 'e2' | 'f2' | 'g2' | 'h2' |
  'a1' | 'b1' | 'c1' | 'd1' | 'e1' | 'f1' | 'g1' | 'h1';

