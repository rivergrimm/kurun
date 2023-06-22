<script setup>
const props = defineProps({
  characters: Object,
  selectedCharacter: Number
})

</script>

<template>
  <label>Select a character:</label>
      <select name="character" id="character" @change="$emit('select', $event)"
          class="form-select"
          aria-label="Character">
          <option>Select...</option>
          <option v-for="character in this.characters" :value="character.id">
              {{ character.name }}
          </option>
      </select>
</template>