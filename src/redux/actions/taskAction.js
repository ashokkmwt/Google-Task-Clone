import { SAVE_TASK, CHECK_TASK,  UNCHECK } from "./types";

const saveTaskAction = (data) => {
    return {
        type: SAVE_TASK,
        payload: data
    }
}

const checkAction = (data) => {
    return {
        type: CHECK_TASK,
        payload: data
    }
}


const doUncheckAction = (data) => {
    return {
        type: UNCHECK,
        payload: data
    }
}


export { saveTaskAction, checkAction, doUncheckAction }