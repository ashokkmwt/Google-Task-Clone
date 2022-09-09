import React from 'react'
import { useDispatch } from 'react-redux'
import { closeDeleteListAction, _deleteListAction } from '../../redux/actions/listAction';
import styles from './index.module.css'

export default function DeleteList(props) {

    const dispatch = useDispatch();

    const closePopup = () => dispatch(closeDeleteListAction());

    const deleteList = () => dispatch(_deleteListAction(props.currentListId));

    return (
        <div className={styles.deleteList}>
            <div className={styles.deletePopup}>
                <h3>Delete this list?</h3>
                <p>All task in the list will be permanently deleted</p>
                <div className={styles.buttonBar}>
                    <button onClick={closePopup}>Cancle</button>
                    <button onClick={deleteList}>Delete</button>
                </div>
            </div>
        </div>
    )
}