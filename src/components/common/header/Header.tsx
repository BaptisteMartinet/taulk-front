import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header: FunctionComponent = () => {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <a href="/">
            <img src="assets/logos/logo_white.png" alt="logo" />
          </a>
        </div>
        <nav aria-label="Menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="#lobbies">Lobbies</Link></li>
            <li><a href="https://github.com/BaptisteMartinet" target="_blanck">Github</a></li>
          </ul>
        </nav>
        <Link to="/login" className={styles.openBtn}>Open App</Link>
      </div>
    </header >
  );
};

export default Header;
