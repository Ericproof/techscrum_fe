import React from 'react';
import styles from './GetStarted.module.scss';

export default function GetStarted() {
  return (
    <section className={styles.getStartedContainer}>
      <div className={styles.getStartedContentContainer}>
        <div className={styles.getStartedIntroduction}>
          <h1>Get started with Teamwork</h1>
          <p>
            Start working together beautifully. See how Teamwork can help your team with our 30-day
            free trial.
          </p>
        </div>
        <div className={styles.getStartedInteractionLinks}>
          <div className={styles.getStartedlinksBtn}>
            <a href="none">Try Teamwork for free</a>
          </div>
          <div className={styles.getStartedlinksBtn}>
            <a href="none">Join a webinar</a>
          </div>
          <div className={styles.getStartedlinksBtn}>
            <a href="none">Get in touch</a>
          </div>
        </div>
      </div>
    </section>
  );
}
