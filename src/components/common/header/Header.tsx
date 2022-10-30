import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';

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
            <li><Link to="/">Get Started</Link></li>
            <li><Link to="/">Lobbies</Link></li>
            <li><a href="https://github.com/BaptisteMartinet">Github</a></li>
          </ul>
        </nav>
        <nav aria-label="Other links">
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
