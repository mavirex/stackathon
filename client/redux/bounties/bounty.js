const GET_BOUNTY = "GET_BOUNTY"
const COMPLETE_BOUNTY = "COMPLETE_BOUNTY"

export function getBounty () {
    return {
        type: GET_BOUNTY,
    }
}

export function completeBounty () {
    return {
        type: COMPLETE_BOUNTY,
    }
}

export default function bountyReducer (state = false, action) {
    if (action.type === GET_BOUNTY) {
        state = true
    }
    if (action.type === COMPLETE_BOUNTY) {
        state = false
    }
    return state
}
