import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.css'
import expand from '../../assets/images/expandIcon.png'
import checkIcon from '../../assets/images/checkIcon.png'
import { doUncheckAction, expandAcion } from '../../redux/actions/taskAction';


export default function Completed() {

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
            {_tasks.filter(todo => todo.isChecked === true).map(taskObj => {
                const { task, id, isChecked, isExpanded, count } = taskObj;
                const expandTask = () => {
                    const data = { id, isExpanded }
                    dispatch(expandAcion(data))
                }

                const doUncheck = () => {
                    const data = { id, isChecked }
                    dispatch(doUncheckAction(data))
                }
                return (
                    <React.Fragment key={id} >
                        <div className={styles.completed}>
                            <div className={styles.completeStatus}>
                                <div>Completed</div>
                                <div>({count})</div>
                                <img onClick={expandTask} className={styles.expand} src={expand} alt="expand icon" />
                            </div>
                            {isExpanded &&
                                <div className={styles.completeStatus}>
                                    <img onClick={doUncheck} className={styles.check} src={checkIcon} alt="check icon" />
                                    <div className={styles.myTask}>{task}</div>
                                </div>
                            }
                        </div>
                    </React.Fragment>
                )
            })}
        </>
    )
}
