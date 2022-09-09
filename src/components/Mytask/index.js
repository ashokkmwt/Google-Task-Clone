import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import important from '../../assets/images/important.svg'
import starIcon from '../../assets/images/starIcon.png'
import { toggleImportantAction, updateTaskAction } from '../../redux/actions/listAction';
import { checkAction } from '../../redux/actions/taskAction'
import styles from './index.module.css'

export default function Mytask() {

    const tasks = useSelector(state => state.listReducer);

    const { currentListId, lists } = tasks


    const filterList = lists.filter(list => list.listId === currentListId);

    let _tasks = []
    
    if (filterList.length !== 0) _tasks = filterList[0].tasks

    const dispatch = useDispatch();



    if (_tasks.length === 0) {
        return (
            <div className={styles.showCompleted} >
                <h1>No Task has been created yet!</h1>
            </div>
        )
    }

    return (
        <>
            {_tasks.map((todo) => {
                const { count, id, task, isChecked, isImportant } = todo;
                const check = () => {
                    const data = { id, count, isChecked }
                    dispatch(checkAction(data))
                }
                const updateTask = () => {
                    const data = { id, currentListId };
                    dispatch(updateTaskAction(data))
                }

                const setImportant = () => {
                    const data = { ...todo, isImportant: true }
                    dispatch(toggleImportantAction(data));
                }

                const removeImportant = () => {
                    const data = { ...todo, isImportant: false }
                    dispatch(toggleImportantAction(data));
                }

                return (
                    <div key={id} className={styles.taskParent}>
                        {!isChecked &&
                            <div className={styles.taskRender}>
                                <input type="checkbox" onClick={check} />

                                <p onClick={updateTask}>{task}</p>

                                {!isImportant ?
                                    <img onClick={setImportant} src={important} alt="important star" className={styles.taskRenderimg} /> :
                                    <img onClick={removeImportant} src={starIcon} alt="star icon" className={styles.taskRenderimg} />
                                }
                            </div>
                        }

                    </div>
                )
            })}
        </>
    )
}