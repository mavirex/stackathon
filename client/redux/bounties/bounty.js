const GET_BOUNTY = "GET_BOUNTY"
const COMPLETE_BOUNTY = "COMPLETE_BOUNTY"

export function getBounty (difficulty) {
    return {
        type: GET_BOUNTY,
        payload: difficulty
    }
}

export function completeBounty () {
    return {
        type: COMPLETE_BOUNTY,
    }
}

export default function bountyReducer (state = '', action) {
    if (action.type === GET_BOUNTY) {
        state = action.payload
    }
    if (action.type === COMPLETE_BOUNTY) {
        state = ''
    }
    return state
}
