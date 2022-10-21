import React from 'react';
import styles from './GetStarted.module.scss';

export default function GetStarted() {
  return (
    <section className={styles.getStartedContainer}>
      <div className={styles.getStartedContentContainer}>
        <div className={styles.getStartedIntroduction}>
          <h1>Get started with TechScrum</h1>
          <p>
            Start working together beautifully. See how TechScrum can help your team with our 30-day
            free trial.
          </p>
        </div>
        <div className={styles.getStartedLinksContainer}>
          <a className={styles.getStartedlinksBtn} href="none">
            Try TechScrum for free
          </a>
          <a className={styles.getStartedlinksBtn} href="none">
            Join a webinar
          </a>
          <a className={styles.getStartedlinksBtn} href="none">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
