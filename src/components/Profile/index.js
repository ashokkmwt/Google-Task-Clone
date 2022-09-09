import React from 'react'
import styles from './index.module.css'
import closeIcon from '../../assets/images/closeIcon.png'
import googleIcon from '../../assets/images/google-icon.png'
import addAccount from '../../assets/images/addAccount.png'
import manageAccount from '../../assets/images/manageAccount.png'
import settingIcon from '../../assets/images/settings.png'
import helpIcon from '../../assets/images/helpIcon.png'
import { closeProfilePopup } from '../../redux/actions/popupActions'
import { useDispatch } from 'react-redux'

export default function Profile() {

    const dispatch = useDispatch();

    const _closePopup = () => dispatch(closeProfilePopup(false));

    const profileArray = [
        { image: addAccount, detail: "Add another account", alternative: "add another account" },
        { image: manageAccount, detail: "Manage accounts on this device", alternative: "manage account" },
        { image: settingIcon, detail: "Tasks settongs", alternative: "setting icon" },
        { image: helpIcon, detail: "Help & feedback", alternative: "help icon" }
    ]

    return (
        <div className={styles.profile}>
            <div className={styles.profilePopup}>
                <div className={styles.p1}>
                    <img onClick={_closePopup} className={styles.closeimg} src={closeIcon} alt='close icon' />
                    <img className={styles.googleimg} src={googleIcon} alt='google icon' />
                </div>
                <div className={styles.p2}>
                    <div className={styles.logo}></div>
                    <div>
                        <h4>Just4Fun All</h4>
                        <p>akakallexam@gmail.com</p>
                    </div>
                </div>
                <div className={styles.p3}>
                    <button>Manage Your Google Account</button>
                </div>
                <div className={styles.p2}>
                    <div className={styles.logo}></div>
                    <div>
                        <h4>ak ak</h4>
                        <p>ashok1481997@gmail.com</p>
                    </div>
                </div>

                {profileArray.map(array => {
                    return (
                        <div className={styles.p5}>
                            <img className={styles.addAccount} src={array.image} alt={array.alternative} />
                            <h5>{array.detail}</h5>
                        </div>
                    )
                })}

                <div className={styles.p4}>
                    <p>Privacy Policy</p><h1>.</h1>
                    <p>Terms of Services</p>
                </div>
                <div className={styles.p4}>
                    <p>Open-source licences</p>
                </div>
            </div>
        </div>
    )
}
