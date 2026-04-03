<script setup lang="ts">
import type { ChessBoard } from "types/Chess";

const startingBoard = ref<ChessBoard>([
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [null, null, null, null, null, null, null, null], 
  [null, null, null, null, null, null, null, null], 
  [null, null, null, null, null, null, null, null], 
  [null, null, null, null, null, null, null, null], 
  [null, null, null, null, null, null, null, null], 
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
]);
</script>

<template>
  <div class="flex items-center w-screen h-screen">
    <div class="w-2/5 h-fill p-8">
      <ChessBoard :board="startingBoard"/>
    </div>
  </div>
</template>
