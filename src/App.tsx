import React, { FunctionComponent } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from 'components/pages';
import './App.scss';

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter >
  );
};

export default App;
