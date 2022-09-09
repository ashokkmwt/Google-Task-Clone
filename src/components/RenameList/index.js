import React, { useState } from 'react'
import styles from './index.module.css'
import closeIcon from '../../assets/images/closeIcon.png'
import { useDispatch, useSelector } from 'react-redux';
import { closeRListAction, listNameAction } from '../../redux/actions/listAction';

export default function RenameList(props) {

    const getLists = useSelector(state => state.listReducer);

    const getList = getLists.lists.filter(list => list.listId === props.currentListId)[0]

    const [newListInput, setNewListInput] = useState(getList.list);

    const dispatch = useDispatch();

    const closeListPopup = () => dispatch(closeRListAction());

    const handleListName = (e) => setNewListInput(e.target.value);

    const updateListName = () => {
        const data = {
            list: newListInput,
            currentListId: props.currentListId
        }
        dispatch(listNameAction(data))
        closeListPopup();
    }

    return (
        <div className={styles.newListParent}>
            <div className={styles.createList}>
                <img onClick={closeListPopup} className={styles.closeImg} src={closeIcon} alt='close icon' />
                <p>Rename list</p>
                <button onClick={updateListName} className={styles.addNewListBtn}>Done</button>
            </div><hr />

            <input onChange={handleListName} value={newListInput} className={styles.addNewListInput} placeholder="Enter list title" /><hr />
        </div>
    )
}
