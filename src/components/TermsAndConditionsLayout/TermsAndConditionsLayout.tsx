import React from 'react';
import ProjectHeader from '../ProjectHeader/ProjectHeader';
import LegalDocumentsNav from './LegalDocumentsNav/LegalDocumentsNav';
import styles from './TermsAndConditionsLayout.module.scss';

export interface ITermsAndConditionsLayout {
  title: string;
  children: React.ReactNode;
}

export default function TermsAndConditionsLayout({ title, children }: ITermsAndConditionsLayout) {
  return (
    <>
      <ProjectHeader />
      <div className={styles.container}>
        <h1>{title}</h1>
        <div className={styles.content}>
          <LegalDocumentsNav />
          <div className={styles.detailedInfo}>{children}</div>
        </div>
      </div>
    </>
  );
}
