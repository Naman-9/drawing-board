import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faRotateLeft, faRotateRight, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import styles from "./index.module.css";

const Menu = () => {
  return (
    <>
        <div className={styles.menuContainer}>
            <div  className={styles.iconWrapper}>
                <FontAwesomeIcon icon={faPencil} className={styles.icon} />
            </div>
            <div className={styles.iconWrapper}>
                <FontAwesomeIcon icon={faRotateLeft} className={styles.icon} />
            </div>
            <div className={styles.iconWrapper}>
                <FontAwesomeIcon icon={faRotateRight} className={styles.icon} />
            </div>
            <div className={styles.iconWrapper}>
                <FontAwesomeIcon icon={faArrowDown} className={styles.icon} />
            </div>
            <div className={styles.iconWrapper}>
                <FontAwesomeIcon icon={faArrowUp} className={styles.icon} />
            </div>
        </div>
    </>
  )
}

export default Menu;