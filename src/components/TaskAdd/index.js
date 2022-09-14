import React, { useState } from 'react'
import styles from './index.module.css'
import menuIcon from '../../assets/images/menuIcon.png'
import moreIcon from '../../assets/images/moreIcon.png'
import addDetail from '../../assets/images/addDetail.png'
import calendar from '../../assets/images/calendar.png'
import important from '../../assets/images/important.svg'
import { useDispatch, useSelector } from 'react-redux'
import { saveTaskAction } from '../../redux/actions/taskAction'
import { showMoreAction } from '../../redux/actions/popupActions'

export default function TaskAdd(props) {

  const { taskAddPopup, setTaskAddPopup, setIsMenu, setIsMore, detail, subtask } = props;

  const [task, setTask] = useState("");

  const { currentListId } = useSelector(state => state.listReducer);

  const addTask = () => setTaskAddPopup(true);

  const dispatch = useDispatch();

  const saveTask = () => {
    if (task === "") {
      alert("type something")
      return
    }

    const id = Math.ceil(Math.random() * 10000000)

    const data = {
      currentListId: currentListId,
      task: task,
      id: id,
      isChecked: false,
      isExpanded: false,
      count: 0,
      updateTaskPopup: false,
      isImportant: false,
      detail: detail,
      completedTaskAlert: true,
      subtask: { subtask: subtask }
    }

    dispatch(saveTaskAction(data))
    setTaskAddPopup(false);
    setTask("");
  }

  const handleTask = (e) => setTask(e.target.value);

  const showMore = () => {
    setIsMore(true)
    dispatch(showMoreAction(currentListId));
  }

  return (
    <div>
      <div className={styles._btn}>
        <button className={styles.addBtn} onClick={addTask} >+</button>
      </div>
      <footer>
        <div className={styles.menuIcon}>
          <img onClick={() => { setIsMenu(true) }} src={menuIcon} alt="menu icon" />
        </div>
        <div className={styles.moreIcon}>
          <img onClick={showMore} src={moreIcon} alt="more icon" />
        </div>
      </footer>
      {taskAddPopup &&
        <div onClick={(e) => { e.stopPropagation() }} className={styles.taskAddPopup}>
          <input onChange={handleTask} placeholder='New task' />
          <div className={styles.newNavBar}>
            <div className={styles._taskImg}>
              <img width="100%" height="100%" src={addDetail} alt="add detail" />
            </div>
            <div className={styles._taskImg}>
              <img width="100%" height="100%" src={calendar} alt="calendar" />
            </div>
            <div className={styles._taskImg}>
              <img width="100%" height="100%" src={important} alt="important" />
            </div>
            <button onClick={saveTask}>Save</button>
          </div> 
        </div>
      }
    </div>
  )
}





