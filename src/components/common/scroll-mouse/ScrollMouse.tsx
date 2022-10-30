import React, { FunctionComponent } from 'react';
import styles from './ScrollMouse.module.scss';

const ScrollMouse: FunctionComponent = () => {
  return (
    <div className={styles.scrolldown}>
      <div className={styles.chevrons}>
        <div className={styles.chevrondown}></div>
        <div className={styles.chevrondown}></div>
      </div>
    </div>
  );
};

export default ScrollMouse;
