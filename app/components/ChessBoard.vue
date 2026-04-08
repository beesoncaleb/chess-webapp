<script lang="ts">
const FENtoSVG: Record<string, string> = {
  'k': '/black_king.svg',
  'q': '/black_queen.svg',
  'b': '/black_bishop.svg',
  'n': '/black_knight.svg',
  'r': '/black_rook.svg',
  'p': '/black_pawn.svg',
  'K': '/white_king.svg',
  'Q': '/white_queen.svg',
  'B': '/white_bishop.svg',
  'N': '/white_knight.svg',
  'R': '/white_rook.svg',
  'P': '/white_pawn.svg'
};
</script>

<script setup lang="ts">
import type { ChessBoard, FlatChessBoard, ChessPiece, BoardPiece } from "types/Chess";

// starting board
const board = ref<ChessBoard>([
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [null, null, null, null, null, null, null, null], 
  [null, null, null, null, null, null, null, null], 
  [null, null, null, null, null, null, null, null], 
  [null, null, null, null, null, null, null, null], 
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
]);

const flatBoard = computed<FlatChessBoard>(
  () => flattenChessBoard(board.value)
);

const selectedSquare = ref<number | null>(null)

// Handle piece selection and moves, no move validation or capturing yet
function handleSelection(flatIndex: number, event: MouseEvent) {
  // If no square selected or current square is empty, then update current selection
  if (!selectedSquare.value || !flatBoard.value[selectedSquare.value]) {
    selectedSquare.value = flatIndex;
  }
  else {
    const piece: BoardPiece = flatBoard.value[selectedSquare.value];

    const currentCol = selectedSquare.value % 8;
    const currentRow = Math.floor(selectedSquare.value / 8);

    const targetCol = flatIndex % 8;
    const targetRow = Math.floor(flatIndex / 8);

    board.value[currentRow][currentCol] = null;
    board.value[targetRow][targetCol] = piece;

    selectedSquare.value = null;
  }
}

function isDark(i) {
  const row = Math.floor(i / 8);
  const col = i % 8;
  return (row + col) % 2 !== 0;
};

function handleKeyDown(event: KeyboardEvent) {
  switch (event.key) {
    case 'Escape':
      selectedSquare.value = null;
      break;
  }
}

// Deselect pieces with escape key
onMounted(() => window.addEventListener('keydown', handleKeyDown));
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown));
</script>

<template>
  <div class="grid grid-cols-8 w-full h-fit aspect-square border-4 border-gray-900">
    <div 
      v-for="(square, i) in flatBoard" 
      :key="i"
      @click.self="handleSelection(i, $event)"
      :class="[
        'relative flex items-center justify-center select-none aspect-square',
        isDark(i) ? 'bg-yellow-800' : 'bg-orange-200',
        selectedSquare === i ? 'ring-3 ring-inset ring-slate-500/80' : ''
      ]"
    >
      <img
        v-if="square"
        @click.self="handleSelection(i, $event)"
        :src="FENtoSVG[square]"
        class="w-7/8 h-7/8 object-contain"
      />
    </div>
  </div>
</template>
