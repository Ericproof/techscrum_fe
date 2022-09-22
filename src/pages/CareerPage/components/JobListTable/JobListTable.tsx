import React from 'react';
import JobListItem from '../JobListItem/JobListItem';
import styles from './JobListTable.module.scss';

const jobs = [
  {
    title: 'Account Executive',
    department: 'Sales',
    location: 'Denver',
    id: '1'
  },
  {
    title: 'Customer Care Agent',
    department: '	Customer Success',
    location: '	Belfast',
    id: '2'
  },
  {
    title: 'General Application',
    department: '	General',
    location: '	Cork (Remote)',
    id: '3'
  },
  {
    title: 'SysOps Teamlead',
    department: 'Technical Operations',
    location: 'Cork (Remote)',
    id: '4'
  },
  {
    title: 'Head of People Experience and Performance',
    department: 'People & Talent',
    location: 'Cork (Remote)',
    id: '5'
  }
];
function JobListTable() {
  return (
    <ul className={styles.jobListTable}>
      {jobs.map((job) => {
        return (
          <JobListItem
            title={job.title}
            department={job.department}
            location={job.location}
            id={job.id}
            key={job.id}
          />
        );
      })}
    </ul>
  );
}

export default JobListTable;
