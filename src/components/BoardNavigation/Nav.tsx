import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBottom from './NavBottom/NavBottom';
import NavMain from './NavMain/NavMain';
import NavTop from './NavTop/NavTop';
import style from './Nav.module.scss';
import Board from '../../pages/Board/index';

export default function Nav() {
  return (
    <div className={style.navAndBoard}>
      <nav className={style.container}>
        <NavTop />
        <NavMain />
        <NavBottom />
      </nav>
      <Routes>
        <Route path="/board" element={<Board />} />
      </Routes>
    </div>
  );
}
