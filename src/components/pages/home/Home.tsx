import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Footer, Header, ScrollMouse } from 'components/common';
import Lobbies from './lobbies';
import styles from './Home.module.scss';

const Home: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('pages.home.title')}</title>
      </Helmet>
      <Header />
      <main>
        <div className={styles.container}>
          <section>
            <div className={styles.heroContainer}>
              <div className={styles.videoContainer}>
                <video autoPlay muted loop>
                  <source src="assets/videos/hero-video1.mp4" type="video/mp4" />
                </video>
              </div>
              <div className={styles.heroOverlay}>
                <h1>{t('pages.home.hero-overlay-title')}</h1>
              </div>
              <div className={styles.scrollMouseContainer}>
                <a href="#about"><ScrollMouse /></a>
              </div>
            </div>
          </section>
          <section id="about">
            <div className={styles.aboutContainer}>
              <div className={styles.textContainer}>
                <h1>{t('pages.home.about-title')}</h1>
              </div>
              <div className={styles.imageContainer}>
                <img src="assets/undraw_online_messaging_re_qft3.svg" alt="messaging illustration" />
              </div>
            </div>
          </section>
          <section id="lobbies">
            <div className={styles.lobbiesContainer}>
              <h1>{t('pages.home.open-lobbies')}</h1>
              <Lobbies />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
