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
  "k" |
  null;

/**
  * Use Tuple types to define a Chessboard as a 2D array of Chess Pieces, looks insane but was honestly much easier using vim macros
  * Board is layed out from ranks 8 - 1 top to bottom
  * This is so that when flattened the flat chess board can just be inserted into a CSS grid layout and it will have the proper layout
  */
export type ChessBoard = [
  /*                File: a     File: b     File: c     File: d     File: e     File: f     File: g     File: h     */ 
  /* Rank 8: */   [ ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece ],
  /* Rank 7: */   [ ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece ],
  /* Rank 6: */   [ ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece ],
  /* Rank 5: */   [ ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece ],
  /* Rank 4: */   [ ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece ],
  /* Rank 3: */   [ ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece ],
  /* Rank 2: */   [ ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece ],
  /* Rank 1: */   [ ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece ]
];

export type FlatChessBoard = [
  /*              File: a     File: b     File: c     File: d     File: e     File: f     File: g     File: h     */ 
  /* Rank 8: */   ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece,
  /* Rank 7: */   ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece,
  /* Rank 6: */   ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece,
  /* Rank 5: */   ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece,
  /* Rank 4: */   ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece,
  /* Rank 3: */   ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece,
  /* Rank 2: */   ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece,
  /* Rank 1: */   ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece, ChessPiece
];
