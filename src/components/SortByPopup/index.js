import React from 'react'
import { useDispatch } from 'react-redux';
import { closeSortAction } from '../../redux/actions/listAction';
import styles from './index.module.css'

export default function SortByPopup() {

  const dispatch = useDispatch();

  const closeSortPopup = () => dispatch(closeSortAction());

  return (
    <div onClick={closeSortPopup} className={styles.sortParent}>
      <div onClick={e => e.stopPropagation()} className={styles.sortPopup}>
        <h4>Sort by</h4>
        <div onClick={closeSortPopup} className={styles.doSort}>
          <input type='checkbox' />
          <p>My order</p>
        </div>
        <div onClick={closeSortPopup} className={styles.doSort}>
          <input type='checkbox' />
          <p>Date</p>
        </div>
        <div onClick={closeSortPopup} className={styles.doSort}>
          <input type='checkbox' />
          <p>Starred recently</p>
        </div>
      </div>
    </div>
  )
}
