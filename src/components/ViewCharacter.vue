<script setup>
import { useRoute } from 'vue-router'
import { getCharacter } from '../store.js'

function valueModifier(value) {
    if (value === 10) {
        return 0
    } else if (value > 10) {
        const diff = value - 10
        return '-' + diff
    } else {
        const diff = 10 - value
        return '+' + diff
    }
}

const route = useRoute()
let character = {}
character = getCharacter(route.query.id)
console.log(character)

</script>

<template>
    <div class="container characterTableConainer">
        <table id="characterTable" class="table table-sm" style="max-width:325px; font-size: 0.8rem;">
            <thead>
                <tr class="table-dark">
                    <th scope="col" colspan="4">{{ character.name }}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Race</th>
                    <td colspan="3">{{ character.race }}</td>
                </tr>
                <tr>
                    <th scope="row">Resistance</th>
                    <td colspan="3">{{ character.resistance }}</td>
                </tr>
                <tr>
                    <th scope="row">Traits</th>
                    <td colspan="3">{{ character.traits.join(', ') }}</td>
                </tr>
                
                <tr>
                    <td colspan="4">
                        <span v-for="(value, attributeName) in character.attributes">
                            <b>{{ attributeName.slice(0, 3).toUpperCase() }}</b>
                            {{ valueModifier(value) }}
                            &nbsp;&nbsp;
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Abilities</th>
                    <td colspan="3">{{ character.abilities.join(', ') }}</td>
                </tr>
                <tr>
                    <th scope="row">Weapons</th>
                    <td colspan="3">{{ character.weapons.join(', ') }}</td>
                </tr>
                <tr>
                    <th scope="row">Armor</th>
                    <td colspan="3">{{ character.armor }}</td>
                </tr>
                <tr>
                    <th scope="row">Defense</th>
                    <td colspan="3">{{ character.defense }}</td>
                </tr>
                <tr>
                    <th scope="row">Toughness</th>
                    <td>{{ character.toughness }}</td>
                    <th scope="row">Pain Threshold</th>
                    <td>{{ character.painThreshold }}</td>
                </tr>
                <tr>
                    <th scope="row">Equipment</th>
                    <td colspan="3">{{ character.equipment.join(', ') }}</td>
                </tr>
                <tr>
                    <th scope="row">Shadow</th>
                    <td colspan="3">{{ character.shadow }}</td>
                </tr>
                <tr>
                    <td colspan="4">
                        <b>Tactics:</b>
                        {{ character.tactics }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.characterTableContainer {
    max-width: 325px;
    margin: 0 auto;
}

#characterTable {
    margin: 0 auto;
}
</style>