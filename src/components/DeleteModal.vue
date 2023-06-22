<script setup>
const props = defineProps({
  characterId: Number
})
</script>
<template>
<div class="modal" id="deleteModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <p>Are you sure you wish to delete this character?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" @click="$emit">Delete Character</button>
      </div>
    </div>
  </div>
</div>
</template>