import React from 'react';
import Nav from '../BoardNavigation/Nav';
import ProjectHeader from '../ProjectHeader/ProjectHeader';
import styles from './DashboardLayout.module.scss';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectHeader />
      <div className={styles.container}>
        <Nav />
        <div className={styles.childrenContainer}>{children}</div>
      </div>
    </>
  );
}
