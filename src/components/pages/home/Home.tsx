import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Footer, Header, ScrollMouse } from 'components/common';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';

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
                  <source src="assets/videos/hero-video2.mp4" type="video/mp4" />
                </video>
              </div>
              <div className={styles.heroOverlay}>
                <h1>Interaction is everything</h1>
              </div>
              <div className={styles.scrollMouseContainer}>
                <Link to={'#lobbies'}><ScrollMouse /></Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
