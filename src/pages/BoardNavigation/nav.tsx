import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBottom from './NavBottom/navBottom';
import NavMain from './NavMain/navMain';
import NavTop from './NavTop/navTop';
import style from './nav.module.scss';
import Board from '../Board/index';

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
