import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../BoardNavigationV2/Navigation';
import ProjectHeader from '../ProjectHeader/ProjectHeader';
import styles from './DashboardLayout.module.scss';

export default function DashboardLayout() {
  return (
    <>
      <ProjectHeader />
      <div className={styles.container}>
        <Navigation />
        <div className={styles.childrenContainer}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
