import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './JobListFooter.module.scss';

function JobListFooter() {
  const location = useLocation();

  return (
    <div className={styles.jobListFooterContainer}>
      <h1>Come join us!</h1>
      <p>
        We&apos;re always on the lookout for exceptional talent, so even if you didn&apos;t find the
        perfect fit, we&apos;d still love to hear from you.
      </p>

      <Link to={`${location.pathname}/iwanttoworkthere`}>Submit a general application</Link>
    </div>
  );
}

export default JobListFooter;
