<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { saveCharacter, getCharacter, defaultCharacter, getTemplate } from '../store.js'

const router = useRouter()
const route = useRoute()
const id = route.query.id
const data = reactive({})

data.character = reactive(defaultCharacter())
let buttonText = 'Create'

if (id) {
    data.character = reactive(getCharacter(id))
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

    let props = data.character[type]
    if (event.charCode === 13 || !event.charCode) {
        props.push(target.value)
        target.value = ''
    }
}

function removeProperty(type, event) {
    let props = data.character[type]
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
    saveCharacter(data.character)
    router.push({ path: '/' })
}

function template(event) {
    const val = event.target.value
    const template = getTemplate(val)
    data.character = template
}
</script>

<template>
    <div class="container mb-5">
        <div class="mb-3">
            <label for="template-select" class="form-label"></label>
            <select class="form-select" id="template-select" @change="template($event)">
                <option value="">Select from a template</option>
                <option value="robber">Robber (CRB)</option>
            </select>
        </div>
        <div class="card mb-3">
            <div class="card-header">Character Basics</div>
            <div class="card-body">
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input id="name" v-model="data.character.name" type="text" aria-label="Name" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="manner" class="form-label">Manner</label>
                        <input id="manner" v-model="data.character.manner" type="text" aria-label="Manner" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="race" class="form-label">Race</label>
                        <input id="race" v-model="data.character.race" class="form-control" aria-label="Race">
                    </div>
                    <div class="mb-3">
                        <label for="resistance" class="form-label">Resistance</label>
                        <select id="resistance" v-model="data.character.resistance" class="form-select"
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
                    <div v-for="(value, key, index) in data.character.attributes" class="col-sm-4">
                        <label class="form-label" for="`${key}`">{{ capitalized(key) }}</label>
                        <div class="mb-3">
                            <input v-model="data.character.attributes[key]"
                                id="`${key}`"
                                class="form-control">
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <label class="form-label" for="toughness">Toughness</label>
                        <div class="mb-3">
                            <input type="text" v-model="data.character.toughness" class="form-control">
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <label class="form-label" for="painThreshold">Pain Threshold</label>
                        <div class="mb-3">
                            <input type="text" v-model="data.character.painThreshold" class="form-control">
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <label class="form-label" for="defense">Defense</label>
                        <div class="mb-3">
                            <input type="text" v-model="data.character.defense" class="form-control">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mb-3">
            <div class="card-header">Character Traits</div>
            <div class="card-body">
                <label class="form-label" for="trait">Trait</label>
                <div class="input-group mb-3">
                    <input id="trait" type="text" name="trait" @keypress="addProperty('traits', $event)"
                        class="form-control" aria-label="Traits" placeholder="">
                    <button class="btn btn-secondary input-group-text" @click="addProperty('traits', $event)">Add
                        Trait</button>
                </div>
                <div>
                    <ul class="list-group">
                        <li v-for="(trait, index) in data.character.traits"
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
                <label class="form-label" for="ability">Ability</label>
                <div class="input-group mb-3">
                    <input type="text" name="ability" @keypress="addProperty('abilities', $event)" class="form-control"
                        aria-label="Abilities">
                    <button class="btn btn-secondary input-group-text" @click="addProperty('abilities', $event)">Add
                        Ability</button>
                </div>
                <div>
                    <ul class="list-group">
                        <li v-for="(ability, index) in data.character.abilities"
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
                    <input id="armor" v-model="data.character.armor" class="form-control" aria-label="armor">
                </div>
                <div class="input-group mb-3">
                    <input type="text" name="weapon" @keypress="addProperty('weapons', $event)" class="form-control"
                        aria-label="Weapons" placeholder="Weapons">
                    <button class="btn btn-secondary input-group-text" @click="addProperty('weapons', $event)">Add
                        Weapon</button>
                </div>
                <div>
                    <ul class="list-group pb-3">
                        <li v-for="(weapon, index) in data.character.weapons"
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
                        <li v-for="(equipment, index) in data.character.equipment"
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
                    <textarea id="shadow" v-model="data.character.shadow" class="form-control"></textarea>
                </div>
                <div class="mb-3">
                    <label for="tactics" class="form-label">Tactics</label>
                    <textarea id="tactics" v-model="data.character.tactics" class="form-control"></textarea>
                </div>
            </div>
        </div>
        <button @click="save" class="btn btn-primary">
            {{ buttonText }}
        </button>
    </div>
</template>

<style scoped>
.form-label {
    font-weight: 600;
}
</style>
