import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationV2 from '../BoardNavigationV2/NavigationV2';
import ProjectHeader from '../ProjectHeader/ProjectHeader';
import styles from './DashboardLayout.module.scss';

export default function DashboardLayout() {
  return (
    <>
      <ProjectHeader />
      <div className={styles.container}>
        <NavigationV2 />
        <div className={styles.childrenContainer}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
