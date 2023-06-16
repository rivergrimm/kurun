<script>
import Character from './Character.vue'

export default {
    components: {
        Character
    },
    data() {
        return {
            characters: [],
            character: {
                name: '',
                resistance: '',
                manner: '',
                traits: [],
                attributes: {
                    accurate: 0,
                    cunning: 0,
                    discreet: 0,
                    persuasive: 0,
                    quick: 0,
                    resolute: 0,
                    strong: 0,
                    vigilant: 0
                },
                abilities: [],
                weapons: [],
                armor: '',
                defense: 0,
                toughness: 0,
                painThreshold: 0,
                equipment: [],
                shadow: '',
                tactics: ''
            },
            resistances: ['Weak', 'Ordinary', 'Challenging', 'Strong', 'Mighty']
        }
    },
    methods: {
        create() {
            if (this.hasValidInput()) {
                this.characters.push(this.character)
            }
        },
        addProperty(type, event) {
            let target = event.target
            
            if (target.tagName !== 'INPUT') {
                target = event.target.previousElementSibling
            }
            
            let props = this.character[type]

            if (event.charCode === 13 || !event.charCode) {
                props.push(target.value)
                target.value = ''
            }
        },
        removeProperty(type, event) {
            let props = this.character[type]
            const index = event.target.value
            props = props.splice(index, 1)
        },
        capitalized(text) {
            return text.toString().charAt(0).toUpperCase() + text.slice(1)
        },
        abbreviate(text) {
            return text.toString().slice(0, 3).toUpperCase()
        },
        hasValidInput() {
            return this.character.name.trim()
        }
    }
}
</script>

<template>
  <div>
    <h1>Character Creation</h1>
    <div class="row g-2 mb-2">
        <div class="col-md-4">
            <label for="name" class="form-label">Name</label>
            <input id="name" v-model="character.name" type="text" aria-label="Name" class="form-control">
        </div>
        <div class="col-md-4">
            <label for="manner" class="form-label">Manner</label>
            <input id="manner" v-model="character.manner" type="text" aria-label="Manner" class="form-control">
        </div>
        <div class="col-md-4">
            <label for="race" class="form-label">Race</label>
            <input id="race" v-model="character.race" class="form-control" aria-label="Race">
        </div>
        <div class="col-md-12">
            <label for="resistance" class="form-label">Resistance</label>
            <select id="resistance" v-model="character.resistance" class="form-select" aria-label="Character Resistance">
                <option v-for="resistance in resistances">
                    {{ resistance }}
                </option>
            </select>
        </div>
    </div>
    <div class="row g-2 mb-2">
        <div class="col-md-6">
            <label for="trait">Traits</label>
            <div class="input-group">
                <input id="trait" type="text" name="trait" @keypress="addProperty('traits', $event)" class="form-control" aria-label="Traits" placeholder="">
                <button class="btn btn-primary input-group-text" @click="addProperty('traits', $event)">Add Trait</button>
                
            </div>
        </div>
        <div class="col-md-6">
            <ul class="list-group">
                <li v-for="(trait, index) in character.traits"
                    class="list-group-item d-flex justify-content-between align-items-start">
                    {{ trait }} 
                    <button 
                        @click="removeProperty('traits', $event)"
                        v-bind:value="`${index}`"
                        type="button"
                        class="btn-close">
                    </button>    
                </li>
            </ul>
        </div>
        <div v-for="(value, key, index) in character.attributes" 
            class="col-sm-2">
            <label for="`${key}`">{{ capitalized(key) }}</label>
            <div class="">
                <input
                    :value="character.attributes[key] > 0 ? character.attributes[key] : ''"
                    class="form-control">
            </div>
        </div>
    </div>
    <div class="row g-2 mb-2">
        <div class="col-md-6">
            <div class="input-group">
                <input 
                    type="text"
                    name="ability"
                    @keypress="addProperty('abilities', $event)"
                    class="form-control"
                    aria-label="Abilities"
                    placeholder="Abilities">
                <button
                    class="btn btn-primary input-group-text"
                    @click="addProperty('abilities', $event)">Add Ability</button>
            </div>
        </div>
        <div class="col-md-6">
            <ul class="list-group">
                <li v-for="(ability, index) in character.abilities"
                    class="list-group-item d-flex justify-content-between align-items-start">
                    {{ ability }} 
                    <button 
                        @click="removeProperty('abilities', $event)"
                        v-bind:value="`${index}`"
                        type="button"
                        class="btn-close">
                    </button>    
                </li>
            </ul>
        </div>
        <div class="col-md-6">
            <div class="input-group">
                <input 
                    type="text"
                    name="weapon"
                    @keypress="addProperty('weapons', $event)"
                    class="form-control"
                    aria-label="Weapons"
                    placeholder="Weapons">
                <button
                    class="btn btn-primary input-group-text"
                    @click="addProperty('weapons', $event)">Add Weapon</button>
            </div>
        </div>
        <div class="col-md-6">
            <ul class="list-group">
                <li v-for="(weapon, index) in character.weapons"
                    class="list-group-item d-flex justify-content-between align-items-start">
                    {{ weapon }} 
                    <button 
                        @click="removeProperty('weapons', $event)"
                        v-bind:value="`${index}`"
                        type="button"
                        class="btn-close">
                    </button>    
                </li>
            </ul>
        </div>
    </div>
    <div class="row mb-2 g-2">
        <div class="col-md-3">
            <label for="armor">Armor</label>
            <input id="armor" v-model="character.armor" class="form-control" aria-label="armor">
        </div>
        <div class="col-md-3">
            <label for="defense">Defense</label>
            <input id="defense" v-model="character.defense" class="form-control" aria-label="defense" placeholder="Defense">
        </div>
        <div class="col-md-3">
            <label for="toughness">Toughness</label>
            <input id="toughness" v-model="character.toughness" class="form-control">
        </div>
        <div class="col-md-3">
            <label for="painThreshold">Pain Threshold</label>
            <input id="painThreshold" v-model="character.painThreshold" class="form-control">
        </div>
        <div class="col-md-6">
            <div class="input-group">
                <input type="text" name="equipment" @keypress="addProperty('equipment', $event)" class="form-control" aria-label="Equipment" placeholder="Equipment">
                <button class="btn btn-primary input-group-text" @click="addProperty('equipment', $event)">Add Equipment</button>
            </div>
        </div>
        <div class="col-md-6">
            <ul class="list-group">
                <li v-for="(equipment, index) in character.equipment"
                    class="list-group-item d-flex justify-content-between align-items-start">
                    {{ equipment }} 
                    <button 
                        @click="removeProperty('equipment', $event)"
                        v-bind:value="`${index}`"
                        type="button"
                        class="btn-close">
                        
                    </button>    
                </li>
            </ul>
        </div>
        <div class="col-md-6">
            <label for="shadow" class="form-label">Shadow</label>
            <textarea id="shadow" v-model="character.shadow" class="form-control"></textarea>
        </div>
        <div class="col-md-6">
            <label for="tactics" class="form-label">Tactics</label>
            <textarea id="tactics" v-model="character.tactics" class="form-control"></textarea>
        </div>
        <div>
            <button @click="create">Create</button>
        </div>
    </div>
    
    <div>
        <Character
            v-for="character in characters"
            :character="character"
        />
    </div>
  </div>
</template>

<style scoped>

</style>
