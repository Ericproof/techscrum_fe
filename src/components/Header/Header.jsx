import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import styles from './Header.module.scss';
import Icon from './IconTab/IconTab';
import ServiceTabs from './ServicesTabs/ServicesTabs';
import LoginTabs from './LoginTabs/LoginTabs';

export default function Header() {
  const [toggle, setToggle] = useState(false);
  const [sizeToggle, setSizeToggle] = useState(false);

  const menuToggle = () => {
    setToggle(!toggle);
  };

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1201) {
        setSizeToggle(true);
        return;
      }
      setSizeToggle(false);
    }
    window.addEventListener('resize', handleResize);
  });

  return (
    <nav className={`${styles.navNormal} ${sizeToggle && toggle ? styles.navActive : ''}`}>
      <div className={styles.container}>
        <Icon />
        <ServiceTabs show={toggle} />
        <div className={styles.space} />
        <LoginTabs show={toggle} />
        <div className={styles.menuBar} onMouseDown={menuToggle} role="button" tabIndex={0}>
          {sizeToggle && toggle ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </div>
      <div className={styles.blurBackground} />
    </nav>
  );
}
