<script setup>
import { store } from '../store.js'

const characters = store.characters
let selectedCharacter = Number(store.activeCharacter || 0)
</script>

<template>
<header>
  <div class="mb-5">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
              <a href="#" class="navbar-brand">Kurun</a>
              <div class="d-flex">
                  <small class="text-muted">
                      A Character Creator for Symbaroum
                  </small>
              </div>
          </div>
      </nav>
  </div>
  
</header>
</template>