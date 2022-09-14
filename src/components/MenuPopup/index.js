import React from 'react'
import styles from './index.module.css'
import starIcon from '../../assets/images/starIcon.png'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { openListAction, taskInListAction } from '../../redux/actions/listAction';


export default function MenuPopup() {

    const getList = useSelector(state => state.listReducer);

    const dispatch = useDispatch();

    const openListPopup = () => dispatch(openListAction(true))

    return (
        <div onClick={(e) => { e.stopPropagation() }} className={styles.menuPopup}>
            <div>

                {getList.lists.map((data, index) => {

                    const addTaskInList = () => dispatch(taskInListAction(data.listId));

                    if (index === 0) {
                        return (
                            <div className={styles.impListBar} key={data.listId} onClick={addTaskInList}>
                                <img className={styles.staricon} src={starIcon} alt="star icon" />
                                <p>Starred</p>
                            </div>);
                    }

                    return (
                        <div className={styles.otherLIst} key={data.listId} onClick={addTaskInList}>{data.list}</div>
                    )
                })}
                <div className={styles.createList} onClick={openListPopup}>+ Create new list</div>
            </div>
        </div>
    )
}
