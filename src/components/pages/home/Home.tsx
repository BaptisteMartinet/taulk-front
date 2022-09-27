import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Home.scss';

const Home: FunctionComponent = () => {
  return (
    <>
      <Helmet>
        <title>Taulk - Homepage</title>
      </Helmet>
      <h1>ici c la homepage</h1>
      <Link to={'dashboard'}>Go to le dashboard</Link>
    </>
  );
};

export default Home;
