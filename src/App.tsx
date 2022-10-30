import React, { FunctionComponent } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from 'components/pages';
import './App.scss';

// TODO init apollo ici

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/dashboard' element={<DashBoard/>} /> */}
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter >
  );
};

export default App;
