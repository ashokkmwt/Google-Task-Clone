import { NEWLIST, OPEN_LIST, CLOSE_LIST, TASK_LIST, CALENDAR, UPDATE_TASK, TASK_DETAIL, TOGGLE_IMPORTANT, UPDATE_TASK_IN_IMPORTANT, DELETE_TASK, CLOSE_CALENDAR, STOP_PROPAGATION, SUBTASK, CLOSE_SUBTASK, ADD_SUBTASK, IMP_LIST, SORT_PUPUP, CLOSE_SORT_PUPUP, NEWLIST_NAME, CLOSE_RENAME_LIST, OPEN_RENAME_LIST, DELETE_LIST_POPUP, CLOSE_DELETE_LIST_POPUP, DELETE_LIST, DELETE_COMPLETED_TASK } from "./types"


const newListAction = (data) => {
    return {
        type: NEWLIST,
        payload: data
    }
}

const listNameAction = (data) => {
    return {
        type: NEWLIST_NAME,
        payload: data
    }
}

const openListAction = () => {
    return {
        type: OPEN_LIST
    }
}

const openRListAction = () => {
    return {
        type: OPEN_RENAME_LIST
    }
}

const closeListAction = () => {
    return {
        type: CLOSE_LIST
    }
}

const _deleteListAction = (data) => {
    return {
        type: DELETE_LIST,
        payload: data
    }
}

const deleteListAction = (data) => {
    return {
        type: DELETE_LIST_POPUP,
        payload: data
    }
}

const closeDeleteListAction = () => {
    return {
        type: CLOSE_DELETE_LIST_POPUP
    }
}

const closeRListAction = () => {
    return {
        type: CLOSE_RENAME_LIST
    }
}

const impListAction = () => {
    return {
        type: IMP_LIST
    }
}

const taskInListAction = (data) => {
    return {
        type: TASK_LIST,
        payload: data
    }
}

const updateTaskAction = (data) => {
    return {
        type: UPDATE_TASK,
        payload: data
    }
}


const toggleImportantAction = (data) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_IMPORTANT,
            payload: data
        })

        dispatch({
            type: UPDATE_TASK_IN_IMPORTANT,
            payload: data
        })
    }
}

const deleteTaskAction = (data) => {
    return {
        type: DELETE_TASK,
        payload: data
    }
}

const addDetailAction = (data) => {
    return {
        type: TASK_DETAIL,
        payload: data
    }
}

const calendarAction = (data) => {
    return {
        type: CALENDAR,
        payload: data
    }
}

const closeCalendarAction = (data) => {
    return (dispatch) => {
        dispatch({
            type: CLOSE_CALENDAR
        })

        dispatch({
            payload: data,
            type: STOP_PROPAGATION
        })
    }
}

const _subtaskPopupAction = () => {
    return {
        type: SUBTASK
    }
}

const subtaskPopupAction = (data) => {
    return {
        payload: data,
        type: CLOSE_SUBTASK
    }

}

const subtaskAction = (data) => {
    return {
        type: ADD_SUBTASK,
        payload: data
    }
}

const sortPopupAction = () => {
    return {
        type: SORT_PUPUP
    }
}

const closeSortAction = () => {
    return {
        type: CLOSE_SORT_PUPUP
    }
}

const deleteCompletedTaskAction = (data) => {
    return {
        type: DELETE_COMPLETED_TASK,
        payload: data
    }
}

export { newListAction, openRListAction, deleteCompletedTaskAction, _deleteListAction, closeDeleteListAction, deleteListAction, closeRListAction, closeSortAction, listNameAction, sortPopupAction, impListAction, subtaskAction, _subtaskPopupAction, subtaskPopupAction, closeCalendarAction, openListAction, addDetailAction, calendarAction, closeListAction, taskInListAction, updateTaskAction, toggleImportantAction, deleteTaskAction }