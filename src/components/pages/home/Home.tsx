import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Footer, Header, ScrollMouse } from 'components/common';
import Lobbies from './lobbies';
import styles from './Home.module.scss';

const Home: FunctionComponent = () => {
  return (
    <>
      <Helmet>
        <title>Taulk - Homepage</title>
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
                <h1>Interaction is everything</h1>
              </div>
              <div className={styles.scrollMouseContainer}>
                <a href="#learn"><ScrollMouse /></a>
              </div>
            </div>
          </section>
          <section id="learn">
            <div className={styles.learnContainer}>
              <div className={styles.textContainer}>
                <h1>Taulk is the best messaging app as of today.<br/>We would be happy to welcome you!</h1>
              </div>
              <div className={styles.imageContainer}>
                <img src="assets/undraw_online_messaging_re_qft3.svg" alt="todo" />
              </div>
            </div>
          </section>
          <section id="lobbies">
            <div className={styles.lobbiesContainer}>
              <h1>Open Lobbies</h1>
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
