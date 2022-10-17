import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../BoardNavigation/Nav';
import ProjectHeader from '../ProjectHeader/ProjectHeader';
import styles from './DashboardLayout.module.scss';

export default function DashboardLayout() {
  return (
    <>
      <ProjectHeader />
      <div className={styles.container}>
        <Nav />
        <div className={styles.childrenContainer}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
