import React from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import styles from './Header.module.scss';
import Icon from './IconTab';
import ServiceTabs from './ServicesTabs/ServicesTabs';
import LoginTabs from './LoginTabs/LoginTabs';

export default function Header() {
  return (
    <nav>
      <div className={styles.container}>
        <Icon />
        <ServiceTabs />
        <div className={styles.space} />
        <LoginTabs />
        <div className={styles.menuBar}>
          <AiOutlineMenu />
          <AiOutlineClose />
        </div>
      </div>
      <div className={styles.blurBackground} />
    </nav>
  );
}
