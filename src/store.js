import { reactive } from 'vue'

const defaultData = {
    name: '',
    resistance: '',
    manner: '',
    race: '',
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

export const defaultCharacter = function (data) {
    if (!data) data = defaultData

    return {
        name: data.name || '',
        resistance: data.resistance || '',
        manner: data.manner || '',
        race: data.race || '',
        traits: data.traits || [],
        attributes: {
            accurate: data.attributes.accurate || null,
            cunning: data.attributes.cunning || null,
            discreet: data.attributes.discreet || null,
            persuasive: data.attributes.persuasive || null,
            quick: data.attributes.quick || null,
            resolute: data.attributes.resolute || null,
            strong: data.attributes.strong || null,
            vigilant: data.attributes.vigilant || null
        },
        toughness: data.toughness || null,
        painThreshold: data.painThreshold || null,
        defense: data.defense || null,
        abilities: data.abilities || [],
        weapons: data.weapons || [],
        armor: data.armor || '',
        equipment: data.equipment || [],
        shadow: data.shadow || '',
        tactics: data.tactics || ''
    }
}

const robber = {
    name: 'Matt',
    resistance: 'Weak',
    manner: 'Scowls menacingly',
    race: 'Human',
    traits: ['Bushcraft'],
    attributes: {
        accurate: 10,
        cunning: 5,
        discreet: 13,
        persuasive: 9,
        quick: 10,
        resolute: 7,
        strong: 11,
        vigilant: 15
    },
    toughness: 11,
    painThreshold: 6,
    defense: '+4',
    abilities: [],
    weapons: ['One-handed weapon 4', 'Throwing weapon 3'],
    armor: 'Crow armor 3 (cumbersome)',
    equipment: ['1D6 throwing weapons', 'pouch of chewing resin', '1D10 ortegs'],
    shadow: 'Various shades of green (corruption: 0)',
    tactics: 'Robbers have learned to calculate the odds and will not attack if outnumbered - not even a strong leader can force them to attack a superior enemy.'
}

const templates = {
    robber: robber
}

export const getTemplate = function (templateName) {
    const char = defaultCharacter(templates[templateName]) 
    return char
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

export const getCharacters = function (chars) {
    const allCharacters = getAllCharacters()
    chars = chars.map((str) => { return parseInt(str) })
    let result = allCharacters.filter((char) => {
        return chars.indexOf(char.id) != -1
    })
    return result
}

export const getAllCharacters = function () {
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
