import React from 'react';
import styles from './AboutCareer.module.scss';

export default function AboutCareer() {
  return (
    <section className={styles.container}>
      <div className={styles.sectionContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.header}>Come join us!</h1>
          <p className={styles.text}>
            We’re always on the lookout for exceptional talent so we’d love to hear from you.
          </p>
          {/* <div className={styles.positionLink}> */}
          <a className={styles.positionLink} href="none">
            See our open positions
          </a>
          {/* </div> */}
        </div>
        <img
          className={styles.img}
          src="https://www.teamwork.com/_nuxt/assets/images/about/teamwork-work-here.webp"
          alt="Images of working environment"
        />
      </div>
    </section>
  );
}
