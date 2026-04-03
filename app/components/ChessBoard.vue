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
import type { ChessBoard, FlatChessBoard, ChessPiece} from "types/Chess";

const props = defineProps<{
  board: ChessBoard
}>();

const flatBoard = computed<FlatChessBoard>(
  () => flattenChessBoard(props.board)
);

function isDark(i) {
  const row = Math.floor(i / 8);
  const col = i % 8;
  return (row + col) % 2 !== 0;
};
</script>

<template>
  <div class="grid grid-cols-8 w-full h-fit aspect-square border-4 border-gray-900">
    <div 
      v-for="(square, i) in flatBoard" 
      :key="i"
      :class="[
        'relative flex items-center justify-center select-none aspect-square',
        isDark(i) ? 'bg-yellow-800' : 'bg-orange-200'
      ]"
    >
      <img
        v-if="square"
        :src="FENtoSVG[square]"
        class="w-7/8 h-7/8 object-contain"
      />
    </div>
  </div>
</template>
