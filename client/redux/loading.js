const LOADING = "LOADING"
const LOADED = "LOADED"

export function _loading () {
    return {
        type: LOADING,
    }
}

export function _loaded () {
    return {
        type: LOADED,
    }
}

export default function loadingReducer (state = true, action) {
    if (action.type === LOADING) {
        state = true
    }
    if (action.type === LOADED) {
        state = false
    }
    return state
}
