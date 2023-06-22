<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { saveCharacter, getCharacter, defaultCharacter } from '../store.js'

const router = useRouter()
const route = useRoute()
const id = route.query.id

let character = reactive(defaultCharacter())
let buttonText = 'Create'

if (id) {
    character = getCharacter(id)
    buttonText = 'Save Edits'
}



const resistances = [
    'Weak',
    'Ordinary',
    'Strong',
    'Challenging',
    'Mighty'
]

function addProperty(type, event) {
    let target = event.target
    if (target.tagName !== 'INPUT') {
        target = event.target.previousElementSibling
    }

    let props = character[type]
    if (event.charCode === 13 || !event.charCode) {
        props.push(target.value)
        target.value = ''
    }
}

function removeProperty(type, event) {
    let props = character[type]
    const index = event.target.value
    props = props.splice(index, 1)
}
 
function capitalized(text) {
    let newText = text.toString().charAt(0).toUpperCase() + text.slice(1)
    if (newText === 'PainThreshold') {
        newText = 'Pain Threshold'
    }
    return newText
}

function save() {
    saveCharacter(character)
    router.push({ path: '/' })
}
</script>

<template>
    <div class="container mb-5">
        <div class="card mb-3">
            <div class="card-header">Character Basics</div>
            <div class="card-body">
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input id="name" v-model="character.name" type="text" aria-label="Name" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="manner" class="form-label">Manner</label>
                        <input id="manner" v-model="character.manner" type="text" aria-label="Manner" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="race" class="form-label">Race</label>
                        <input id="race" v-model="character.race" class="form-control" aria-label="Race">
                    </div>
                    <div class="mb-3">
                        <label for="resistance" class="form-label">Resistance</label>
                        <select id="resistance" v-model="character.resistance" class="form-select"
                            aria-label="Character Resistance">
                            <option v-for="resistance in resistances">
                                {{ resistance }}
                            </option>
                        </select>
                    </div>
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-header">Character Attributes</div>
            <div class="card-body">
                <div class="row">
                    <div v-for="(value, key, index) in character.attributes" class="col-sm-4">
                        <label for="`${key}`">{{ capitalized(key) }}</label>
                        <div class="mb-3">
                            <input v-model="character.attributes[key]"
                                id="`${key}`"
                                class="form-control">
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <label for="toughness">Toughness</label>
                        <div class="mb-3">
                            <input type="text" v-model="character.toughness" class="form-control">
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <label for="painThreshold">Pain Threshold</label>
                        <div class="mb-3">
                            <input type="text" v-model="character.painThreshold" class="form-control">
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <label for="defense">Defense</label>
                        <div class="mb-3">
                            <input type="text" v-model="character.defense" class="form-control">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mb-3">
            <div class="card-header">Character Traits</div>
            <div class="card-body">
                <label for="trait">Trait</label>
                <div class="input-group mb-3">
                    <input id="trait" type="text" name="trait" @keypress="addProperty('traits', $event)"
                        class="form-control" aria-label="Traits" placeholder="">
                    <button class="btn btn-secondary input-group-text" @click="addProperty('traits', $event)">Add
                        Trait</button>
                </div>
                <div>
                    <ul class="list-group">
                        <li v-for="(trait, index) in character.traits"
                            class="list-group-item d-flex justify-content-between align-items-start">
                            {{ trait }}
                            <button @click="removeProperty('traits', $event)" v-bind:value="`${index}`" type="button"
                                class="btn-close">
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-header">Character Abilities</div>
            <div class="card-body">
                <label for="ability">Ability</label>
                <div class="input-group mb-3">
                    <input type="text" name="ability" @keypress="addProperty('abilities', $event)" class="form-control"
                        aria-label="Abilities">
                    <button class="btn btn-secondary input-group-text" @click="addProperty('abilities', $event)">Add
                        Ability</button>
                </div>
                <div>
                    <ul class="list-group">
                        <li v-for="(ability, index) in character.abilities"
                            class="list-group-item d-flex justify-content-between align-items-start">
                            {{ ability }}
                            <button @click="removeProperty('abilities', $event)" v-bind:value="`${index}`" type="button"
                                class="btn-close">
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-header">Character Equipment</div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="armor" class="form-label">Armor</label>
                    <input id="armor" v-model="character.armor" class="form-control" aria-label="armor">
                </div>
                <div class="input-group mb-3">
                    <input type="text" name="weapon" @keypress="addProperty('weapons', $event)" class="form-control"
                        aria-label="Weapons" placeholder="Weapons">
                    <button class="btn btn-secondary input-group-text" @click="addProperty('weapons', $event)">Add
                        Weapon</button>
                </div>
                <div>
                    <ul class="list-group pb-3">
                        <li v-for="(weapon, index) in character.weapons"
                            class="list-group-item d-flex justify-content-between align-items-start">
                            {{ weapon }}
                            <button @click="removeProperty('weapons', $event)" v-bind:value="`${index}`" type="button"
                                class="btn-close">
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="input-group mb-3">
                    <input type="text" name="equipment" @keypress="addProperty('equipment', $event)" class="form-control"
                        aria-label="Equipment" placeholder="Equipment">
                    <button class="btn btn-secondary input-group-text" @click="addProperty('equipment', $event)">Add
                        Equipment</button>
                </div>
                <div>
                    <ul class="list-group">
                        <li v-for="(equipment, index) in character.equipment"
                            class="list-group-item d-flex justify-content-between align-items-start">
                            {{ equipment }}
                            <button @click="removeProperty('equipment', $event)" v-bind:value="`${index}`" type="button"
                                class="btn-close">

                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-header">Character Details</div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="shadow" class="form-label">Shadow</label>
                    <textarea id="shadow" v-model="character.shadow" class="form-control"></textarea>
                </div>
                <div class="mb-3">
                    <label for="tactics" class="form-label">Tactics</label>
                    <textarea id="tactics" v-model="character.tactics" class="form-control"></textarea>
                </div>
            </div>
        </div>
        <button @click="save" class="btn btn-primary">
            {{ buttonText }}
        </button>
    </div>
</template>

<style scoped>
</style>
