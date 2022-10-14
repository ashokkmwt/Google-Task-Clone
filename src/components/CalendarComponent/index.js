import React from 'react'
import { Calendar } from 'react-calendar'
import styles from "./index.module.css"
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css'
import scheduleIcon from "../../assets/images/scheduleIcon.svg"
import repeatIcon from "../../assets/images/repeatIcon.svg"
import { useDispatch } from 'react-redux';
import { closeCalendarAction } from '../../redux/actions/listAction';

export default function CalendarComponent() {

  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();

  const closeCalendar = () => dispatch(closeCalendarAction());

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div onClick={closeCalendar} className={styles.calendarParent}>
      <div onClick={stopPropagation} className={styles.calendarContainer}>
        <div className={styles.calendar}>
          <Calendar className={styles.calendarChild} onChange={setDate} value={date} />
          <div className={styles.time}>
            <img className={styles.scheduleIcon} src={scheduleIcon} alt="schedule icon" />
            <p className={styles._time}>Set timed</p>
          </div>
          <div className={styles.time}>
            <img className={styles.scheduleIcon} src={repeatIcon} alt="repeat icon" />
            <p className={styles._time}>Repeat</p>
          </div>
          <div className={styles.buttonBar}>
            <button onClick={closeCalendar} className={styles.cancleButton}>Cancel</button>
            <button className={styles.doneButton}>Done</button>
          </div>
        </div>
      </div>
    </div>
  )
}
