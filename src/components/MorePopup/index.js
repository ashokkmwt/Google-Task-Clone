import React from 'react'
import styles from './index.module.css'
import cx from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCompletedTaskAction, deleteListAction, openRListAction, sortPopupAction, _deleteListAction } from '../../redux/actions/listAction';

export default function MorePopup(props) {

    const getTask = useSelector(state => state.listReducer);

    let _listAlert = {};

    getTask.lists.forEach(list => {

        if (list.listId === props.currentListId) { _listAlert.listAlert = list.listAlert; }

    });

    let _list = getTask.lists.filter(list => list.listId === props.currentListId)[0]

    let _completedTaskAlert = false;

    _list.tasks.forEach(task => { _completedTaskAlert = task.completedTaskAlert })

    const dispatch = useDispatch();

    const showSortPopup = () => dispatch(sortPopupAction());

    const renameList = () => dispatch((openRListAction()));

    const deleteListPopup = () => {

        if (_list.tasks.length === 0) {

            dispatch(_deleteListAction(props.currentListId));

        } else {

            dispatch(deleteListAction(props.currentListId));

        }
    }

    const deleteCompletedTask = () => dispatch(deleteCompletedTaskAction(props.currentListId));

    return (
        <div onClick={(e) => { e.stopPropagation() }} className={styles.morePopup}>
            {props.currentListId === 'jhgjgj242' ?
                <div className={styles._m1}>
                    <p onClick={showSortPopup}>Sort by</p>
                    <p className={styles.type}>My order</p>
                </div> :
                <>
                    <div className={styles.m1}>
                        <p onClick={showSortPopup}>Sort by</p>
                        <p className={styles.type}>My order</p>
                    </div><hr />
                    <div className={cx(styles.m1, styles.m2)}>
                        <p onClick={renameList}>Rename list</p>
                    </div>
                    <div className={cx(styles.m1, styles.m2)}>
                        <p onClick={deleteListPopup}>Delete list</p>
                        {_listAlert.listAlert && <p className={styles.listAlert}>Default list can't be deleted</p>}
                    </div>
                    <div className={cx(styles.m1, styles.m2)}>
                        <p onClick={deleteCompletedTask} className={_completedTaskAlert ? styles['listAlert'] : undefined} >Delete all completed tasks</p>
                    </div>
                </>
            }
        </div>
    )
}