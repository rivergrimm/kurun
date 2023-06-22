import { reactive } from 'vue'

export const defaultCharacter = function () {
    return {
        name: '',
        resistance: '',
        manner: '',
        traits: [],
        attributes: {
            accurate: null,
            cunning: null,
            discreet: null,
            persuasive: null,
            quick: null,
            resolute: null,
            strong: null,
            vigilant: null
        },
        toughness: null,
        painThreshold: null,
        defense: null,
        abilities: [],
        weapons: [],
        armor: '',
        equipment: [],
        shadow: '',
        tactics: ''
    }
}

let data = {
    characters: []
}

if (localStorage.getItem('characters')) {
    try {
        data.characters = JSON.parse(localStorage.getItem('characters'))
    } catch(e) {
        localStorage.removeItem('characters')
    }
}

export const saveCharacter = function(character) {
    if (character.id) {
        const oldCharacter = getCharacter(character.id)
        data.characters = data.characters.filter(char => char.id !== character.id)
        data.characters.push(character)
        const parsed = JSON.stringify(data.characters)
        localStorage.setItem('characters', parsed)
    } else {
        let index = getNextIndex()
        character.id = index++
        data.characters.push(character)
        const parsed = JSON.stringify(data.characters)
        localStorage.setItem('characters', parsed)
        localStorage.setItem('nextIndex', index++)
    }
}

function getNextIndex() {
    const index = localStorage.getItem('nextIndex')
    return index ? parseInt(index) : 0
}

export const deleteCharacter = function (characterId, cb) {
    data.characters = data.characters.filter(char => char.id !== characterId)
    const parsed = JSON.stringify(data.characters)
    localStorage.setItem('characters', parsed)
    return cb()
}

export const getCharacter = function (characterId) {
    return data.characters.find(char => Number(char.id) === Number(characterId))
}

export const getCharacters = function () {
    if (localStorage.getItem('characters')) {
        try {
            data.characters = JSON.parse(localStorage.getItem('characters'))
        } catch(e) {
            localStorage.removeItem('characters')
        }
    }
    return data.characters
}

export const store = reactive(data)
