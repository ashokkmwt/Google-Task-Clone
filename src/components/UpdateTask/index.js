import React, { useState } from "react";
import styles from "./index.module.css";
import backArrowIcon from '../../assets/images/backArrow.png';
import importantIcon from '../../assets/images/important.svg';
import starIcon from '../../assets/images/starIcon.png';
import deleteIcon from '../../assets/images/deleteIcon.svg';
import addDetail from '../../assets/images/addDetail.png';
import calendarIcon from '../../assets/images/calendarIcon.svg';
import closeIcon from '../../assets/images/closeIcon.png';
import subtaskIcon from '../../assets/images/subtaskIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { closeUpdateAction } from '../../redux/actions/popupActions';
import { addDetailAction, calendarAction, deleteTaskAction, subtaskAction, subtaskPopupAction, toggleImportantAction, _subtaskPopupAction } from '../../redux/actions/listAction';
import CalendarComponent from "../CalendarComponent";

export default function UpdateTask(props) {

    const [subTask, setSubTask] = useState("");

    const { _task, currentListId, setDetail } = props;

    const { task, id, isImportant } = _task;

    const dispatch = useDispatch();

    const getTask = useSelector(state => state.listReducer);

    const _lists = getTask.lists;

    const filterList = _lists.filter(list => list.listId === currentListId);
    let _tasks = []

    if (filterList.length !== 0) {
        _tasks = filterList[0].tasks
    }

    const __task = _tasks.filter(task => task.id === id)

    let updateTask = __task[0];
    const subtasks = updateTask.subtask

    const listName = _lists.filter(list => list.listId === currentListId)[0].list;

    const closeUpdate = () => dispatch(closeUpdateAction(id));

    const setImportant = () => {
        const data = { ...props._task, isImportant: true }
        dispatch(toggleImportantAction(data));
    }

    const removeImportant = () => {
        const data = { ...props._task, isImportant: false }
        dispatch(toggleImportantAction(data));
    }

    const deleteTask = () => dispatch(deleteTaskAction(id))

    const handleDetailValue = (e) => {
        const _detail = e.target.value
        setDetail(_detail)
        const data = { _detail, id, currentListId }
        dispatch(addDetailAction(data))
    }

    const showCalendar = () => dispatch(calendarAction(getTask.isCalendar));

    const addSubtaskPopup = () => {
        dispatch(_subtaskPopupAction());
    }

    const closeSubtask = () => {
        const popup = getTask.subtask;
        const data = { currentListId, popup, id }
        dispatch(subtaskPopupAction(data));
    }

    const handleSubtask = (e) => {
        setSubTask(e.target.value);
    }

    const _addSubtask = () => {
        const value = {
            subTask: subTask,
            id: Math.ceil(Math.random() * 100000)
        }

        const data = { value: value, taskId: id, currentListId }

        dispatch(subtaskAction(data));
    }

    return (
        <>
            {getTask.isCalendar && <CalendarComponent />}
            <div className={styles.updateTask}>
                <div className={styles.backImgDelete}>
                    <img onClick={closeUpdate} className={styles.backArrow} src={backArrowIcon} alt="backArrow icon" />
                    {isImportant ?
                        <img onClick={removeImportant} className={styles.importantIcon} src={starIcon} alt="star icon" /> :
                        <img onClick={setImportant} className={styles.importantIcon} src={importantIcon} alt="important icon" />
                    }
                    <img onClick={deleteTask} className={styles.deleteIcon} src={deleteIcon} alt="delete icon" />
                </div>
                <div className={styles.listOptions}>
                    <p>{listName}</p>
                    <h1>\/</h1>
                </div>
                <div className={styles.task}>{task}</div>
                <div className={styles.detail}>
                    <img className={styles.addDetail} src={addDetail} alt="add detail" />
                    <textarea onChange={handleDetailValue} value={updateTask.detail} className={styles.detailInput} placeholder='Add details' />
                </div>
                <div onClick={showCalendar} className={styles.calendar}>
                    <img className={styles.calendarIcon} src={calendarIcon} alt="calendar icon" />
                    <textarea className={styles.detailInput} placeholder='Add date/time' />
                </div>


                <div className={styles._subtask}>
                    <img className={styles.subtaskIcon} src={subtaskIcon} alt="subtask icon" />
                    <div className={styles.yyyyy}>
                        {getTask.subtask &&
                            <>
                                {subtasks.map((st) => {
                                    return (
                                        <div key={st.id} className={styles.subtaskBox}>
                                            <input type="checkbox" className={styles.subtaskInput} />
                                            <textarea className={styles.detailInput} placeholder='Enter title' value={st.subTask} onChange={handleSubtask} />
                                            <img onClick={closeSubtask} className={styles.closeIcon} src={closeIcon} alt="close icon" />
                                        </div>
                                    )
                                })}
                            </>
                        }
                        <button onClick={_addSubtask} className={styles.addSubtask}>Add</button>
                        <button onClick={addSubtaskPopup} className={styles._subtaskButton}>Add subtasks</button>
                    </div>
                </div>
            </div>
        </>
    )
}
