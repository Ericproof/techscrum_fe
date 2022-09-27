import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import styles from './JobListItem.module.scss';

interface IJobListItem {
  title: string;
  department: string;
  location: string;
  id: string;
}

function JobListItem(props: IJobListItem) {
  const location = useLocation();
  const { title, department, location: jobLocation, id } = props;
  return (
    <li className={styles.jobListItem} id={id}>
      <Link className={styles.role} to={`${location.pathname}/${id}`}>
        {title}
      </Link>
      <div className={styles.department}> {department}</div>
      <div className={styles.location}>{jobLocation}</div>
      <Link className={styles.applyButton} to={`${location.pathname}/1`}>
        <span className={styles.applyButtonText}>Apply now</span>
      </Link>
    </li>
  );
}

export default JobListItem;
