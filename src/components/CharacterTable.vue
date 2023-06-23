<script setup>
import { Modal } from 'bootstrap'
import { reactive } from 'vue'
import { deleteCharacter, getCharacters } from '../store';

const data = reactive({})
data.characters = getCharacters()

let toDelete = null

function prepDelete(id) {
    toDelete = id
}

function refresh() {
    data.characters = getCharacters()
}

function confirmDelete() {
    deleteCharacter(toDelete, function() {
        refresh()
        var myModalEl = document.getElementById('deleteModal')
        var modal = Modal.getInstance(myModalEl)
        modal.hide()
    })
}

</script>

<template>
    <div v-if="!data.characters.length">
        You have no characters yet.
        <div>
            <router-link :to="{path: 'create'}">
                Create New Character
            </router-link>
        </div>
    </div>

    <table v-else class="table">
        <thead class="table-light">
            <tr>
                <th scope="col">Your Characters</th>
                <th scope="col" class="text-end">
                    <router-link :to="{
                        name: 'create'
                    }">New Character</router-link>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="character in data.characters">
                <td class="">
                    <router-link :to="{
                        path: 'view',
                        query: { id: character.id }
                    }">
                        {{ character.name }}
                    </router-link>
                </td>
                <td class="text-end">
                    <router-link :to="{
                        path: 'edit',
                        query: { id: character.id }
                    }">Edit</router-link>
                    /
                    <a href="" class="" data-bs-toggle="modal" data-bs-target="#deleteModal"
                        @click="prepDelete(character.id)">Delete</a>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="modal" id="deleteModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <p>Are you sure you wish to delete this character?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="confirmDelete">Delete Character</button>
                </div>
            </div>
        </div>
    </div>
</template>