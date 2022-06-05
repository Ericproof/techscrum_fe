import React from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import styles from './Home.module.scss';
import Icon from '../../components/Header/IconTab/IconTab';
import ServiceTabs from '../../components/Header/ServicesTabs/ServicesTabs';
import LoginTabs from '../../components/Header/LoginTabs/LoginTabs';
import CooperateTabs from '../../components/Footer/CooperateTabs';
import ServicesTabs from '../../components/Footer/ServicesTabs';
import PolicyMediaTabs from '../../components/Footer/PolicyMediaTabs';

export default function Home() {
  return (
    <div>
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
      <footer>
        <CooperateTabs />
        <ServicesTabs />
        <PolicyMediaTabs />
      </footer>
    </div>
  );
}
