import { CLOSE_PROFILE_POPUP, OPEN_PROFILE_POPUP } from "../actions/types"

const initialState = {
    popup: false
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case CLOSE_PROFILE_POPUP:
            return { ...state, popup: action.payload }
            
        case OPEN_PROFILE_POPUP:
            return { ...state, popup: action.payload }

        default:
            return state
    }
}

export { profileReducer }