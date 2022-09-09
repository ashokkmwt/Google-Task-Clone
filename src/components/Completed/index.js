import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.css'
import expand from '../../assets/images/expandIcon.png'
import checkIcon from '../../assets/images/checkIcon.png'
import { doUncheckAction } from '../../redux/actions/taskAction';


export default function Completed() {

    const [isOpne, setIsOpne] = useState(false);

    const getTask = useSelector(state => state.listReducer);

    const { currentListId, lists } = getTask;

    const filterList = lists.filter(list => list.listId === currentListId);
    let _tasks = []
    if (filterList.length !== 0) {
        _tasks = filterList[0].tasks
    }

    const dispatch = useDispatch();

    return (
        <>
            <div style={{ display: "flex" }}>
                <h1 style={{ textAlign: "left", fontSize: 22 }}>Completed {_tasks.filter(todo => todo.isChecked === true).length}</h1>
                <img onClick={() => setIsOpne(!isOpne)} className={styles.expand} src={expand} alt="expand icon" />
            </div>

            {isOpne && _tasks.filter(todo => todo.isChecked === true).map((taskObj) => {
                const { task, id, isChecked } = taskObj;
                const doUncheck = () => {
                    const data = { id, isChecked }
                    dispatch(doUncheckAction(data))
                }
                return (
                    <React.Fragment key={id} >
                        <div className={styles.completed}>
                      
                            <div className={styles.completeStatus}>
                                <img onClick={doUncheck} className={styles.check} src={checkIcon} alt="check icon" />
                                <div className={styles.myTask}>{task}</div>
                            </div>
                        </div>
                    </React.Fragment>
                )
            })}
        </>
    )
}
