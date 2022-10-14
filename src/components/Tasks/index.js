import React, { useState } from 'react'
import styles from './index.module.css'
import TaskAdd from '../TaskAdd'
import { useSelector, useDispatch } from 'react-redux'
import Completed from '../Completed'
import NewList from '../NewList'
import Mytask from '../Mytask'
import MenuPopup from '../MenuPopup'
import MorePopup from '../MorePopup'
import { openProfilePopup } from '../../redux/actions/popupActions'
import { openListAction, taskInListAction } from '../../redux/actions/listAction'
import UpdateTask from '../UpdateTask'
import SortByPopup from '../SortByPopup'
import RenameList from '../RenameList'
import DeleteList from '../DeleteList'

import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Tasks() {

    // add gmail
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            navigate('/')
        } catch (error) {
            console.log(error);
        }
        dispatch(openProfilePopup(true))
    };

    const goToDashboard = () => {
        auth.signOut();
        navigate('/');
    }

    const [taskAddPopup, setTaskAddPopup] = useState(false);

    const [isMenu, setIsMenu] = useState(false);

    const [isMore, setIsMore] = useState(false);

    const [detail, setDetail] = useState("");

    const dispatch = useDispatch();

    let newList = useSelector(state => state.listReducer)

    const sortPopup = newList.sortPopup;

    const { isNewList, renameList, lists, currentListId, taskDetails, deleteList } = newList;

    const openListPopup = () => dispatch(openListAction());

    const hidePopup = () => {

        taskAddPopup && setTaskAddPopup(false);
        isMenu && setIsMenu(false);
        isMore && setIsMore(false);

    }

    const filterList = lists.filter(list => list.listId === currentListId);

    let _tasks = [];

    // if there is no task in list, then don't there will be no child and we won't be able to access
    // [0].tasks - So we use condition.

    if (filterList.length !== 0) _tasks = filterList[0].tasks;

    return (
        <>
            {deleteList && <DeleteList currentListId={currentListId} />}
            {renameList && <RenameList currentListId={currentListId} />}
            {_tasks.map(_task => {
                return (
                    <React.Fragment key={_task.id}>
                        {_task.updateTaskPopup && <UpdateTask _task={_task} currentListId={currentListId} taskDetails={taskDetails} detail={detail} setDetail={setDetail} />}
                    </React.Fragment>
                )
            })}

            {isNewList && <NewList />}

            {sortPopup && <SortByPopup />}

            <div onClick={hidePopup} className={styles.parent}>

                {loading && <h1>Loading...</h1>}

                <div className={styles.taskBar}>
                    <div className={styles.heading}>Tasks</div>

                    {/* login */}
                    {!user &&
                        <div onClick={GoogleLogin} className={styles.profile}><p>Login</p></div>
                    }
                    {user && (
                        <div className={styles.user}>
                            <div className={styles.userImage}>
                                <img
                                    width="100%"
                                    height="100%"
                                    src={user.photoURL}
                                    alt='user'
                                    referrerPolicy='no-referrer'
                                    className='w-12 rounded-full'
                                />
                            </div>
                            <h3 onClick={goToDashboard}>Sign Out</h3>
                        </div>
                    )}

                </div>
                <nav className={styles.navBar}>
                    <ol>

                        {lists.map((list, index) => {

                            const _listId = list.listId

                            const addTaskInList = () => dispatch(taskInListAction(list.listId));

                            if (index === 0) {
                                return (
                                    <li key={list.listId} onClick={addTaskInList}>
                                        <svg className={styles.impList} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                            <path fillRule="evenodd" clipRule="evenodd" d="M66.6578 24.5927L50.3956 0L33.5926 25.4106L3.2273e-05 26.2416L17.0534 50.4223L0.791199 75.015H34.3973L52.0178 100L67.4757 75.015H100L83.197 49.6044L99.1691 23.7885L66.6578 24.5927Z" fill={_listId === currentListId ? "blue" : "#000000"} />
                                        </svg>
                                    </li>

                                );
                            }

                            return (
                                <li className={_listId === currentListId ? styles.listStyles : ""} key={list.listId} onClick={addTaskInList}>{list.list}</li>
                            )
                        })}
                        <li className={styles._li} onClick={openListPopup}>+ New list</li>
                    </ol>
                </nav><hr />
                <main>

                    <Mytask />

                    <Completed />

                </main><hr />

                <TaskAdd taskAddPopup={taskAddPopup} setTaskAddPopup={setTaskAddPopup} setIsMenu={setIsMenu} setIsMore={setIsMore} detail={detail} />

                {/* adding menu popup */}
                {isMenu && <MenuPopup />}

                {/* adding more popup */}
                {isMore && <MorePopup currentListId={currentListId} />}

            </div>
        </>
    )
}
// localStorage.clear()
