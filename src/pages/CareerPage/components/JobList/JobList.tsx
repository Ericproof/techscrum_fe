import React from 'react';
import styles from './JobList.module.scss';
import JobListFilter from '../JobListFilter/JobListFilter';
import JobListPagination from '../JobListPagination/JobListPagination';
import JobListTable from '../JobListTable/JobListTable';

function JobList() {
  return (
    <div className={styles.JobList}>
      <div className={styles.JobListHeader}>
        <h3 className={styles.JobListTitle}>Open opportunities at Teamwork</h3>
        <JobListFilter />
      </div>
      <JobListTable />
      <JobListPagination />
    </div>
  );
}

export default JobList;
