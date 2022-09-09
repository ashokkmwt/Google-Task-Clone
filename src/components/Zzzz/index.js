import React, { useState } from 'react'
import styles from './index.module.css'
import starIcon from '../../assets/images/starIcon.png'
import goldStar from '../../assets/images/Golden-Star.png'
import TaskAdd from '../TaskAdd'
import { useSelector, useDispatch } from 'react-redux'
import Completed from '../Completed'
import NewList from '../NewList'
import Profile from '../Profile'
import Mytask from '../Mytask'
import MenuPopup from '../MenuPopup'
import MorePopup from '../MorePopup'
import { openProfilePopup } from '../../redux/actions/popupActions'
import { openListAction } from '../../redux/actions/listAction'
import UpdateTask from '../UpdateTask'
import SortByPopup from '../SortByPopup'
import RenameList from '../RenameList'
import DeleteList from '../DeleteList'
import { Tabs } from 'antd'

export default function Zzzz() {

    const [subtask, setSubtask] = useState("");

    const [taskAddPopup, setTaskAddPopup] = useState(false);

    const [isMenu, setIsMenu] = useState(false);

    const [isMore, setIsMore] = useState(false);

    const [detail, setDetail] = useState("");

    const dispatch = useDispatch();

    let newList = useSelector(state => state.listReducer)

    const sortPopup = newList.sortPopup;

    const { isNewList, renameList, lists, currentListId, taskDetails, deleteList } = newList;

    let { popup } = useSelector(state => state.profileReducer)

    const openListPopup = () => dispatch(openListAction());

    const hidePopup = () => {

        taskAddPopup && setTaskAddPopup(false);
        isMenu && setIsMenu(false);
        isMore && setIsMore(false);

    }

    const _openPopup = () => dispatch(openProfilePopup(true))


    const filterList = lists.filter(list => list.listId === currentListId);

    let _tasks = [];

    if (filterList.length !== 0) _tasks = filterList[0].tasks;

    return (
        <>
            {deleteList && <DeleteList currentListId={currentListId} />}
            {renameList && <RenameList currentListId={currentListId} />}
            {_tasks.map(_task => {
                return (
                    <React.Fragment key={_task.id}>
                        {_task.updateTaskPopup && <UpdateTask _task={_task} currentListId={currentListId} taskDetails={taskDetails} detail={detail} setDetail={setDetail} setSubtask={setSubtask} />}
                    </React.Fragment>
                )
            })}

            {popup && <Profile />}

            {isNewList && <NewList />}

            {sortPopup && <SortByPopup />}

            <div onClick={hidePopup} className={styles.parent}>
                <div className={styles.taskBar}>
                    <div className={styles.heading}>Tasks</div>
                    <div onClick={_openPopup} className={styles.profile}></div>
                </div>
                <nav className={styles.navBar}>
                    <ol>


{/* working here */}
                        <Tabs
                        style={{width:"100px", height:"100px", backgroundColor:"orange"}}
                            defaultActiveKey="1"
                            items={lists.map((list, index) => {
                                const _listName = list.list;
                                const id = list.listId;
                                if (index === 0) {
                                    return {
                                        label: <img src={starIcon} width="22px" height="22px" alt='something' />,
                                        id: id,
                                        children: `Tab${id}`
                                    }
                                }
                                return {
                                    label: {_listName},
                                    id: id
                                };
                            })} />

                        <li onClick={openListPopup}>+ New list</li>
                    </ol>
                </nav><hr />
                <main>

                    <Mytask />

                    <Completed />

                    <img src={goldStar} alt="important" className={styles.goldStar} />
                    <div className={styles.info}>
                        <h2>No Starred tasks</h2>
                        <h4>Mark important tasks with a star so you can easily find them here</h4>
                    </div>
                </main><hr />

                <TaskAdd taskAddPopup={taskAddPopup} setTaskAddPopup={setTaskAddPopup} setIsMenu={setIsMenu} setIsMore={setIsMore} detail={detail} subtask={subtask} />

                {/* adding menu popup */}
                {isMenu && <MenuPopup />}

                {/* adding more popup */}
                {isMore && <MorePopup currentListId={currentListId} />}

            </div>
        </>
    )
}
// localStorage.clear()