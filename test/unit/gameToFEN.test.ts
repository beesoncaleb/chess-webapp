import { expect, test } from 'vitest';
import gameToFEN from '../../app/utils/gameToFEN';
import type { ChessBoard, PlayerMove, PlayerTurn } from '../../types/Chess'

type InputConfig = {
  description: string;
  board: ChessBoard;
  halfmoveClock: number;
  moveHistory: PlayerMove[];
  playerMove: PlayerTurn;
  expected: string;
}

const testInput: InputConfig[] = [
  // Starting Position
  {
    description: 'Starting Position',
    board: [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      [null, null, null, null, null, null, null, null], 
      [null, null, null, null, null, null, null, null], 
      [null, null, null, null, null, null, null, null], 
      [null, null, null, null, null, null, null, null], 
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ],
    halfmoveClock: 0,
    moveHistory: [],
    playerMove: 'w',
    expected: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  },

  // After 1. e4
  {
    description: 'After 1. e4',
    board: [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      [null, null, null, null, null, null, null, null], 
      [null, null, null, null, null, null, null, null], 
      [null, null, null, null, 'P', null, null, null], 
      [null, null, null, null, null, null, null, null], 
      ['P', 'P', 'P', 'P', null, 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ],
    halfmoveClock: 0,
    moveHistory: [
      { start: 'e2', end: 'e4', turn: 'w', piece: 'P' }
    ],
    playerMove: 'b',
    expected: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'
  },

  // Random mid game
  {
    description: 'Random mid game',
    board: [
      ['r', null, 'b', 'q', 'k', null, null, 'r'],
      ['p', 'p', null, null, 'b', 'p', 'p', 'p'],
      [null, null, 'n', 'p', 'p', 'n', null, null], 
      [null, null, null, null, null, null, null, null], 
      [null, null, null, 'N', 'P', null, null, null], 
      [null, null, 'N', null, 'B', null, null, null], 
      ['P', 'P', 'P', null, 'B', 'P', 'P', 'P'],
      ['R', null, null, 'Q', 'K', null, null, 'R']
    ],
    halfmoveClock: 2,
    moveHistory: [
      { start: "e2", end: "e4", turn: "w", piece: "P" },
      { start: "c7", end: "c5", turn: "b", piece: "p" },
      { start: "g1", end: "f3", turn: "w", piece: "N" },
      { start: "d7", end: "d6", turn: "b", piece: "p" },
      { start: "d2", end: "d4", turn: "w", piece: "P" },
      { start: "c5", end: "d4", turn: "b", piece: "p", capture: "P" },
      { start: "f3", end: "d4", turn: "w", piece: "N", capture: "p" },
      { start: "g8", end: "f6", turn: "b", piece: "n" },
      { start: "b1", end: "c3", turn: "w", piece: "N" },
      { start: "b8", end: "c6", turn: "b", piece: "n" },
      { start: "c1", end: "e3", turn: "w", piece: "B" },
      { start: "e7", end: "e6", turn: "b", piece: "p" },
      { start: "f1", end: "e2", turn: "w", piece: "B" },
      { start: "f8", end: "e7", turn: "b", piece: "b" }
    ],
    playerMove: 'w',
    expected: 'r1bqk2r/pp2bppp/2nppn2/8/3NP3/2N1B3/PPP1BPPP/R2QK2R w KQkq - 2 8'
  },

  // En Passant available
  {
    description: 'En Passant available',
    board: [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', null, 'p', 'p', 'p', 'p', 'p'],
      [null, null, null, null, null, null, null, null], 
      [null, null, 'p', null, null, null, null, null], 
      [null, null, null, null, 'P', null, null, null], 
      [null, null, null, null, null, null, null, null], 
      ['P', 'P', 'P', 'P', null, 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ],
    halfmoveClock: 0,
    moveHistory: [
      { start: "e2", end: "e4", turn: "w", piece: "P" },
      { start: "c7", end: "c5", turn: "b", piece: "p" }
    ],
    playerMove: 'w',
    expected: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2'
  },

  // No castling
  {
    description: 'No castling',
    board: [
      ['r', null, 'b', 'q', 'k', null, null, 'r'],
      ['p', 'p', 'p', 'p', null, 'p', 'p', 'p'],
      [null, null, 'n', null, null, 'n', null, null],
      [null, null, null, null, 'p', null, null, null],
      [null, null, 'B', null, 'P', null, null, null],
      [null, null, 'P', null, null, null, null, null],
      ['P', 'P', null, 'P', null, 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', null, 'N', 'R'],
    ],
    halfmoveClock: 3,
    moveHistory: [
      { start: "e2", end: "e4", turn: "w", piece: "P" },
      { start: "e7", end: "e5", turn: "b", piece: "p" },
      { start: "e1", end: "e2", turn: "w", piece: "K" },
      { start: "e8", end: "e7", turn: "b", piece: "k" },
      { start: "e2", end: "e1", turn: "w", piece: "K" },
      { start: "e7", end: "e8", turn: "b", piece: "k" },
      { start: "c2", end: "c3", turn: "w", piece: "P" },
      { start: "b8", end: "c6", turn: "b", piece: "n" },
      { start: "f1", end: "c4", turn: "w", piece: "B" },
      { start: "g8", end: "f6", turn: "b", piece: "n" }
    ],
    playerMove: 'w',
    expected: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/2P5/PP1P1PPP/RNBQK1NR w - - 3 6'
  },

  // Partial Castling
  {
    description: 'Partial Castling',
    board: [
      [null, 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['r', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      [null, null, null, null, null, null, null, null], 
      ['p', null, null, null, null, null, null, null], 
      [null, null, null, null, null, null, null, null], 
      [null, null, null, null, null, null, null, 'P'], 
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'R'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', null]
    ],
    halfmoveClock: 2,
    moveHistory: [
      { start: "h2", end: "h3", turn: "w", piece: "P" },
      { start: "a7", end: "a5", turn: "b", piece: "p" },
      { start: "h1", end: "h2", turn: "w", piece: "R" },
      { start: "a8", end: "a7", turn: "b", piece: "r" }
    ],
    playerMove: 'w',
    expected: '1nbqkbnr/rppppppp/8/p7/8/7P/PPPPPPPR/RNBQKBN1 w Qk - 2 3'
  },

  // Alternating Pieces - Checkerboard of pawns
  {
    description: 'Alternating Pieces - Checkerboard of pawns',
    board: [
      [null, 'p', null, 'p', null, 'p', null, 'p'],
      ['p', null, 'p', null, 'p', null, 'p', null],
      [null, 'p', null, 'p', null, 'p', null, 'p'],
      ['p', null, 'p', null, 'p', null, 'p', null],
      [null, 'P', null, 'P', null, 'P', null, 'P'],
      ['P', null, 'P', null, 'P', null, 'P', null],
      [null, 'P', null, 'P', null, 'P', null, 'P'],
      ['P', null, 'P', null, 'P', null, 'P', null]
    ],
    halfmoveClock: 0,
    moveHistory: [],
    playerMove: 'w',
    expected: '1p1p1p1p/p1p1p1p1/1p1p1p1p/p1p1p1p1/1P1P1P1P/P1P1P1P1/1P1P1P1P/P1P1P1P1 w KQkq - 0 1'
  },
  
  // All white pieces
  {
    description: 'All white pieces',
    board: [
      [null, null, null, null, null, null, null, null], 
      [null, null, null, null, null, null, null, null], 
      [null, null, null, null, null, null, null, null], 
      [null, null, null, null, null, null, null, null], 
      [null, null, null, null, null, null, null, null], 
      [null, null, null, null, null, null, null, null], 
      [null, null, null, null, null, null, null, null], 
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ],
    halfmoveClock: 0,
    moveHistory: [],
    playerMove: 'w',
    expected: '8/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1'
  },

  // All black pieces
  {
    description: 'All black pieces',
    board: [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      [null, null, null, null, null, null, null, null], 
      [null, null, null, null, null, null, null, null], 
      [null, null, null, null, null, null, null, null], 
      [null, null, null, null, null, null, null, null], 
      [null, null, null, null, null, null, null, null], 
      [null, null, null, null, null, null, null, null], 
      [null, null, null, null, null, null, null, null] 
    ],
    halfmoveClock: 0,
    moveHistory: [],
    playerMove: 'w',
    expected: 'rnbqkbnr/8/8/8/8/8/8/8 w KQkq - 0 1'
  }
]

// Run all tests
test.each(testInput)('$description', ({board, halfmoveClock, moveHistory, playerMove, expected}) => {
  expect(gameToFEN(board, halfmoveClock, moveHistory, playerMove)).toBe(expected);
});
