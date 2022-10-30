import React, { FunctionComponent } from 'react';
// import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Footer, Header } from 'components/common';
import './Home.scss';

const Home: FunctionComponent = () => {
  return (
    <>
      <Helmet>
        <title>Taulk - Homepage</title>
      </Helmet>
      <Header/>
      <main></main>
      <Footer/>
      { /* <Link to={'dashboard'}>Go to le dashboard</Link> */ }
    </>
  );
};

export default Home;
