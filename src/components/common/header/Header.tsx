import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const MinScrollValue = 5;

const Header: FunctionComponent = () => {
  const { t } = useTranslation();
  const [top, setTop] = React.useState(true);
  React.useEffect(() => {
    document.addEventListener('scroll', () => {
      const scrolled = document.scrollingElement?.scrollTop;
      if (scrolled == null) return;
      if (scrolled >= MinScrollValue) {
        setTop(false);
      } else {
        setTop(true);
      }
    });
  });
  return (
    <header>
      <div className={styles.container} style={{ background: top ? 'transparent' : 'rgba(0, 0, 0, 0.8)' }}>
        <div className={styles.logoContainer}>
          <a href="/">
            <img src="assets/logos/logo_white.png" alt="logo" />
          </a>
        </div>
        <nav aria-label="Menu">
          <ul>
            <li><a href="/#">{t('common.header.nav.home')}</a></li>
            <li><a href="/#learn">{t('common.header.nav.about')}</a></li>
            <li><a href="/#lobbies">{t('common.header.nav.lobbies')}</a></li>
            <li><a href="https://github.com/BaptisteMartinet" target="_blanck">Github</a></li>
          </ul>
        </nav>
        <Link to="/login" className={styles.openBtn}>{t('common.header.openApp')}</Link>
      </div>
    </header >
  );
};

export default Header;
