import React, { useState, useRef } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import styles from './Header.module.scss';
import Icon from './IconTab/IconTab';
import ServiceTabs from './ServicesTabs/ServicesTabs';
import LoginTabs from './LoginTabs/LoginTabs';

export default function Header() {
  const [toggle, setToggle] = useState(false);
  const navRef = useRef(null);

  const menuToggle = () => {
    setToggle(!toggle);
    if (toggle) {
      navRef.current.style.maxWidth = '100%';
      navRef.current.style.minHeight = '50px';
      navRef.current.style.maxHeight = '80px';
      navRef.current.style.height = '100%';
      navRef.current.style.overflow = 'hidden';
    } else {
      navRef.current.style.maxWidth = '400px';
      navRef.current.style.minHeight = 'none';
      navRef.current.style.maxHeight = 'none';
      navRef.current.style.height = '100vh';
      navRef.current.style.overflowY = 'auto';
    }
  };

  return (
    <nav ref={navRef}>
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
