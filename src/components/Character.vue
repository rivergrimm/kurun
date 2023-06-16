<script>
import turndown from 'turndown'
const turndownService = new turndown()

export default {
    props: {
        character: {
            name: String,
            race: String,
            resistance: String,
            manner: String,
            traits: Array,
            attributes: Object,
            abilities: Array,
            weapons: Array,
            armor: String,
            defense: String,
            toughness: Number,
            painThreshold: Number,
            equipment: String,
            shadow: String,
            tactics: String
        }
    },
    methods: {
        valueModifier(value) {
            if (value === 10) {
                return 0
            } else if (value > 10) {
                const diff = value - 10
                return '-' + diff
            } else {
                const diff = 10 - value
                return '+' + diff
            }
        },
        getMarkdown() {
            const markdown = turndownService.turndown(this.$refs.character)
            navigator.clipboard.writeText(markdown)
        }
    }
}
</script>

<template>
    <div ref="character">
        <table class="characterTable">
            <tr>
                <th colspan="8">{{ character.name }}</th>
            </tr>
            <tr>
                <td v-for="(value, attributeName) in character.attributes">
                    <span class="attributeName">{{ attributeName.slice(0, 3).toUpperCase() }}</span>
                    <span class="attributeValue">{{ valueModifier(value) }}</span>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <span class="attributeName">Defense</span>
                    <span class="attributeValue">{{ character.defense }}</span>
                </td>
                <td colspan="2">
                    <span class="attributeName">Armor</span>
                    <span class="attributeValue">{{ character.armor }}</span>
                </td>
                <td colspan="4">
                    <span class="attributeName">Toughness</span>
                    <span class="attributeValue">{{ character.toughness }}</span>
                </td>
            </tr>

        </table>
        <h3>{{ character.name }}</h3>
        <div>
            {{ character.race }} | {{ character.resistance }} | {{ character.manner }}<br>
            <b>Traits:</b> {{ character.traits.join(', ') }}<br>
            <span v-for="(value, attributeName) in character.attributes">
                <b>{{ attributeName.slice(0, 3).toUpperCase() }}</b>
                {{ value }} ({{ valueModifier(value) }})
                &nbsp;&nbsp;
            </span><br>
            <b>Abilities:</b> {{ character.abilities.join(', ') }}<br>
            <b>Weapons:</b> {{ character.weapons.join(', ') }}<br>
            <b>Armor:</b> {{ character.armor }}&nbsp;&nbsp;
            <b>Defense:</b> {{ character.defense }}&nbsp;&nbsp;
            <b>Toughness:</b> {{ character.toughness }}&nbsp;&nbsp;
            <b>Pain Threshold:</b> {{ character.painThreshold }}&nbsp;&nbsp;
            <b>Equipment:</b> {{ character.equipment }}<br>
            <b>Shadow:</b> {{ character.shadow }}<br>
            <b>Tactics:</b> {{ character.tactics }}<br>
        </div>
    </div>
    <div><button @click="getMarkdown">Markdown</button></div>
</template>

<style scoped>

</style>