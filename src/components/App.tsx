import React, { FunctionComponent } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import accountStore from 'store/app/account';
import {
  NotFound,
  Home,
  Login,
  Register,
  Dashboard,
  JoinLobby,
} from 'components/pages';
import './App.scss';

const App: FunctionComponent = () => {
  React.useEffect(() => {
    accountStore.init().catch(() => { });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/join-lobby/:id' element={<JoinLobby />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter >
  );
};

export default App;
