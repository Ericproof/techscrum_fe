import React from 'react';
import styles from './AboutCareer.module.scss';

export default function AboutCareer() {
  return (
    <section className={styles.container}>
      <div className={styles.leftPart}>
        <h1>Come join us!</h1>

        <p>We’re always on the lookout for exceptional talent so we’d love to hear from you.</p>

        <a href="none">See our open positions</a>
      </div>
      <img
        className={styles.rightPart}
        src="https://www.teamwork.com/_nuxt/assets/images/about/teamwork-work-here.webp"
        alt="Images of working environment"
      />
    </section>
  );
}
