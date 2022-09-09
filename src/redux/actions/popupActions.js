import { OPEN_PROFILE_POPUP, CLOSE_PROFILE_POPUP, CLOSE_UPDATE_POPUP, SHOW_MORE_POPUP, COMPLETE_TASK_ALERT } from "./types";

const openProfilePopup = (data) => {
    // console.log(data);
    return {
        type: OPEN_PROFILE_POPUP,
        payload: data // will be boolean value true
    }
}

const closeProfilePopup = (data) => {
    return {
        type: CLOSE_PROFILE_POPUP,
        payload: data // will be boolean value false
    }
}

const closeUpdateAction = (data) => {
    return {
        type: CLOSE_UPDATE_POPUP,
        payload: data
    }
}

const showMoreAction = (data) => {
    return (dispatch) => {
        dispatch({
            type: SHOW_MORE_POPUP
        })

        dispatch({
            type: COMPLETE_TASK_ALERT,
            payload: data
        })
    }

}


export { openProfilePopup, closeProfilePopup, closeUpdateAction, showMoreAction }