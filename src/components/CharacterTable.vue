<script setup>
import { Modal } from 'bootstrap'
import { reactive } from 'vue'
import router from '../routes'
import { deleteCharacter, getAllCharacters } from '../store'

const data = reactive({})
data.checked = []
data.characters = getAllCharacters()

let toDelete = null

function prepDelete(id) {
    toDelete = id
}

function refresh() {
    data.characters = getAllCharacters()
}

function confirmDelete() {
    deleteCharacter(toDelete, function() {
        refresh()
        var myModalEl = document.getElementById('deleteModal')
        var modal = Modal.getInstance(myModalEl)
        modal.hide()
    })
}

function viewCharacters() {
    router.push({
        path: 'view',
        query: {
            chars: data.checked
        }
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
                <th scope="col" colspan="2">Your Characters</th>
                <th scope="col" class="text-end">
                    <router-link :to="{
                        name: 'create'
                    }">New Character</router-link>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="character in data.characters">
                <th scope="row" style="width: 25px">
                    <input type="checkbox"
                        :value="character.id"
                        :id="character.name"
                        v-model="data.checked">
                </th>
                <td class="">
                    <router-link :to="{
                        path: 'view',
                        query: { chars: [character.id] }
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
        <tfoot>
            <tr>
                <td colspan="3" class="border-bottom-0">
                    <button type="button" @click="viewCharacters" class="btn btn-primary">
                        View Selected Characters
                    </button>
                </td>
            </tr>
        </tfoot>
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