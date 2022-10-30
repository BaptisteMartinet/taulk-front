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
                <a href="#lobbies"><ScrollMouse /></a>
              </div>
            </div>
          </section>
          <section id="lobbies">
            <div className={styles.lobbiesContainer}>
              <h1>Lobbies</h1>
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
