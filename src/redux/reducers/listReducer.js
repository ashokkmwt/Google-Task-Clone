import { deepCopy } from "../../utils/helper";
import {
    OPEN_LIST, NEWLIST, CLOSE_LIST, SAVE_TASK, TASK_LIST, CHECK_TASK,
    UNCHECK, UPDATE_TASK, CLOSE_UPDATE_POPUP, TOGGLE_IMPORTANT,
    UPDATE_TASK_IN_IMPORTANT, DELETE_TASK, TASK_DETAIL, CALENDAR, CLOSE_CALENDAR,
    SUBTASK, CLOSE_SUBTASK, ADD_SUBTASK, IMP_LIST, SORT_PUPUP, CLOSE_SORT_PUPUP,
    NEWLIST_NAME, RENAME_LIST, CLOSE_RENAME_LIST, OPEN_RENAME_LIST, DELETE_LIST_POPUP,
    CLOSE_DELETE_LIST_POPUP, DELETE_LIST, SHOW_MORE_POPUP, DELETE_COMPLETED_TASK, COMPLETE_TASK_ALERT
} from "../actions/types"

const initialState = {
    isNewList: false,
    currentListId: "jghgjh6757657j242",
    isCalendar: false,
    subtask: false,
    sortPopup: false,
    renameList: false,
    deleteList: false,
    lists: [{
        list: "important",
        listId: "jhgjgj242",
        listAlert: false,
        tasks: []
    },
    {
        list: "My Tasks",
        listId: "jghgjh6757657j242",
        listAlert: false,
        tasks: []
    }]
}

const listReducer = (state = initialState, action) => {

    let newState = deepCopy(state);

    const { currentListId, lists } = newState;

    let _lists = [];

    switch (action.type) {

        case TASK_LIST:
            return { ...newState, currentListId: action.payload }

        case SAVE_TASK:

            _lists = lists.map(list => {

                if (list.listId === action.payload.currentListId) {

                    const updateList = list.tasks;

                    updateList.push(action.payload);

                    return { ...list, tasks: updateList }

                }

                return list;

            })

            return { ...newState, lists: _lists }

        case NEWLIST:

            const { list, listId } = action.payload;

            const newListObj = {
                list,
                listId,
                listAlert: false,
                tasks: []
            }

            const updateList = newState.lists

            updateList.push(newListObj);

            return { ...newState, lists: updateList, currentListId: listId };

        case NEWLIST_NAME:

            _lists = lists.map(list => {

                if (list.listId === action.payload.currentListId) return { ...list, list: action.payload.list };

                return list
            })
            return { ...newState, lists: _lists }

        case RENAME_LIST:
            return { ...newState, isNewList: true }

        case OPEN_LIST:
            return { ...newState, isNewList: true }

        case OPEN_RENAME_LIST:
            return { ...newState, renameList: true }

        case CLOSE_LIST:
            return { ...newState, isNewList: false }

        case DELETE_LIST:

            _lists = lists.filter(list => {

                if (list.listId === "jghgjh6757657j242" || list.listId === "jhgjgj242") return list;

                return list.listId !== action.payload

            });

            return { ...newState, lists: _lists, currentListId: "jghgjh6757657j242", deleteList: false }

        case DELETE_LIST_POPUP:

            return { ...newState, deleteList: true }

        case CLOSE_DELETE_LIST_POPUP:

            return { ...newState, deleteList: false }

        case CLOSE_RENAME_LIST:

            return { ...newState, renameList: false }

        case IMP_LIST:

            return { ...newState, currentListId: "jhgjgj242" }

        case CHECK_TASK:

            const { id, count } = action.payload;

            _lists = lists.map(list => {

                if (list.listId === currentListId) {

                    const tasks = list.tasks.map(task => {

                        if (task.id === id) return { ...task, isChecked: true, count: count + 1 }

                        return task
                    })
                    return { ...list, tasks }
                }
                return list
            })

            return { ...newState, lists: _lists }

        case UNCHECK:

            _lists = lists.map(list => {

                if (list.listId === currentListId) {

                    const tasks = list.tasks.map(task => {

                        if (task.id === action.payload.id) {

                            return {

                                ...task,

                                isChecked: !action.payload.isChecked,

                                completedTaskAlert: true,

                                count: action.payload.count - 1

                            }

                        }
                        return task;
                    })
                    return { ...list, tasks }
                }
                return list;
            });

            return { ...newState, lists: _lists }

        case UPDATE_TASK:

            _lists = lists.map((list) => {

                if (list.listId === action.payload.currentListId) {

                    const task = list.tasks.map(_task => {

                        if (_task.id === action.payload.id) return { ..._task, updateTaskPopup: true }

                        return _task
                    })
                    return { ...list, tasks: task }
                }
                return list
            })
            return { ...newState, lists: _lists }

        case CLOSE_UPDATE_POPUP:

            _lists = lists.map((list) => {

                const task = list.tasks.map(_task => {

                    if (_task.id === action.payload) return { ..._task, updateTaskPopup: false }

                    return _task
                })
                return { ...list, tasks: task }
            })
            return { ...newState, lists: _lists }

        case TOGGLE_IMPORTANT:

            _lists = lists.map((list) => {

                if (list.listId === action.payload.currentListId) {

                    const task = list.tasks.map(_task => {

                        if (_task.id === action.payload.id) return { ..._task, isImportant: action.payload.isImportant }

                        return _task
                    })
                    return { ...list, tasks: task }
                }
                return list
            })
            return { ...newState, lists: _lists }

        case UPDATE_TASK_IN_IMPORTANT:

            _lists = lists.map((list) => {

                if (list.listId === 'jhgjgj242') {

                    let tasks = [];

                    if (action.payload.isImportant) {

                        tasks = list.tasks;

                        tasks.push(action.payload);

                    } else {

                        tasks = list.tasks.filter(task => task.id !== action.payload.id);

                    }
                    return { ...list, tasks }
                }
                return list
            })
            return { ...newState, lists: _lists }

        case DELETE_TASK:

            _lists = lists.map(list => {

                let tasks = list.tasks;

                const updatedTask = tasks.filter(task => task.id !== action.payload)

                return { ...list, tasks: updatedTask }
            })
            return { ...newState, lists: _lists }

        case TASK_DETAIL:

            _lists = lists.map(list => {

                if (list.listId === action.payload.currentListId) {

                    const _tasks = list.tasks;

                    const _task = _tasks.map(task => {

                        if (task.id === action.payload.id) {

                            let _taskDetails = task.detail;

                            _taskDetails = action.payload._detail;

                            return { ...task, detail: _taskDetails }
                        }
                        return task
                    })
                    return { ...list, tasks: _task }
                }
                return list
            })
            return { ...newState, lists: _lists }

        case CALENDAR:

            return { ...newState, isCalendar: true }

        case CLOSE_CALENDAR:

            return { ...newState, isCalendar: false }

        case SUBTASK:

            return { ...newState, subtask: true }

        case CLOSE_SUBTASK:

            _lists = lists.map(list => {

                if (list.listId === action.payload.currentListId) {

                    const _tasks = list.tasks;

                    const _task = _tasks.map(task => {

                        if (task.id === action.payload.id) {

                            task.subtask.subtask = ""

                            return task
                        }
                        return task
                    })
                    return { ...list, tasks: _task }
                }
                return list
            })
            return { ...newState, subtask: false }

        case ADD_SUBTASK:

            _lists = lists.map(list => {

                if (list.listId === action.payload.currentListId) {

                    const _tasks = list.tasks;

                    const _task = _tasks.map(task => {

                        if (task.id === action.payload.id) {

                            const _subtask = task.subtask;

                            _subtask.subtask = action.payload._subtask;

                            return { ...task, subtask: _subtask }
                        }
                        return task
                    })
                    return { ...list, tasks: _task }
                }
                return list
            })
            return { ...newState, lists: _lists }

        case SORT_PUPUP:

            return { ...newState, sortPopup: true }

        case CLOSE_SORT_PUPUP:

            return { ...newState, sortPopup: false }

        case SHOW_MORE_POPUP:

            _lists = lists.map(list => {

                if (list.listId === 'jhgjgj242' || list.listId === 'jghgjh6757657j242') {
                    return { ...list, listAlert: true }
                }

                return list
            })
            return { ...newState, lists: _lists }


        // working here , still not working
        case COMPLETE_TASK_ALERT:
            _lists = lists.map(list => {

                if (list.listId === action.payload) {
                    const _tasks = list.tasks.map(task => {
                        if (task.isChecked) {
                            return { ...task, completedTaskAlert: false }
                        }
                        return task
                    })
                    return { ...list, tasks: _tasks }
                }
                return list
            })
            return { ...newState, lists: _lists }

        case DELETE_COMPLETED_TASK:

            _lists = lists.map(list => {

                let _tasks = list.tasks;

                if (list.listId === action.payload) {

                    _tasks = _tasks.filter(task => !task.isChecked);

                    return { ...list, tasks: _tasks }
                }
                return list
            })
            return { ...newState, lists: _lists }

        default:
            return state
    }
}

export { listReducer }

// localStorage.clear()