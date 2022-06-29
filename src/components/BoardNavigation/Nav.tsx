import React from 'react';
import NavBottom from './NavBottom/NavBottom';
import NavMain from './NavMain/NavMain';
import NavTop from './NavTop/NavTop';
import style from './Nav.module.scss';

export default function Nav() {
  return (
    <nav className={style.container}>
      <NavTop />
      <NavMain />
      <NavBottom />
    </nav>
  );
}
