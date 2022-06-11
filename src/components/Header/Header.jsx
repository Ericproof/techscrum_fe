import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import styles from './Header.module.scss';
import Icon from './IconTab/IconTab';
import ServiceTabs from './ServicesTabs/ServicesTabs';
import LoginTabs from './LoginTabs/LoginTabs';

export default function Header() {
  const [toggle, setToggle] = useState(false);

  const menuToggle = () => {
    setToggle(!toggle);
  };

  return (
    <nav className={`${styles.navNormal} ${toggle ? styles.navActive : ''}`}>
      <div className={styles.container}>
        <Icon />
        <ServiceTabs show={toggle} />
        <div className={styles.space} />
        <LoginTabs show={toggle} />
        <div className={styles.menuBar} onMouseDown={menuToggle} role="button" tabIndex={0}>
          {toggle ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </div>
      <div className={styles.blurBackground} />
    </nav>
  );
}
