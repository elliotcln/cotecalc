import Vue from 'vue'

export const state = () => ({
    z: 0,
    games: {
        match1: {
            cotes: Array(26).fill(1)
        },
        match2: {
            cotes: Array(26).fill(1)
        }
    }
})

export const getters = {
    z(state) {
        return state.z
    },
    games(state) {
        return state.games
    }
}

export const actions = {}

export const mutations = {
    setGames(state, games) {
        state.games = games
    },
    editCote(state, payload) {
        const games = JSON.parse(localStorage['games'])
        games[payload.matchIndex].cotes[payload.index] = parseFloat(payload.newValue)

        localStorage['games'] = JSON.stringify(games)
        console.log("localStorage['games']", localStorage['games'])
        Vue.set(state.games[payload.matchIndex].cotes, payload.index, parseFloat(payload.newValue))
    },
    updateZ(state, newValue) {
        state.z = newValue
    }
}