<script setup>
import { store } from '../store.js'
import CharacterTable from './CharacterTable.vue'

const characters = store.characters
</script>

<template>
  <div class="container">
    <div class="">
      <CharacterTable />
    </div>
  </div>
</template>