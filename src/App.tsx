import React, { FunctionComponent } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, DashBoard } from 'components/pages';
import './App.scss';

// TODO init apollo ici

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dashboard' element={<DashBoard/>} />
      </Routes>
    </BrowserRouter >
  );
};

export default App;
