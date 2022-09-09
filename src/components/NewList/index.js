import React, { useState } from 'react'
import styles from './index.module.css'
import closeIcon from '../../assets/images/closeIcon.png'
import { useDispatch } from 'react-redux';
import { closeListAction, newListAction } from '../../redux/actions/listAction';

export default function NewList() {

    const [newListInput, setNewListInput] = useState("");

    const id = Math.ceil(Math.random() * 1000000);

    const dispatch = useDispatch();

    const closeListPopup = () => dispatch(closeListAction(false))

    const handleListName = (e) => setNewListInput(e.target.value);

    const saveListName = () => {

        if (newListInput === "") {
            alert("type something here")
            return
        }

        const data = {
            list: newListInput,
            listId: id
        }
        dispatch(newListAction(data))
        closeListPopup();
    }

    return (
        <div className={styles.newListParent}>
            <div className={styles.createList}>
                <img onClick={closeListPopup} className={styles.closeImg} src={closeIcon} alt='close icon' />
                <p>Create new list</p>
                <button onClick={saveListName} className={styles.addNewListBtn}>Done</button>
            </div><hr />
            <input onChange={handleListName} className={styles.addNewListInput} placeholder="Enter list title" /><hr />
        </div>
    )
}
