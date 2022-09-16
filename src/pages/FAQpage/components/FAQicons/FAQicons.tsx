import React from 'react';
import styles from './FAQicons.module.scss';

export default function FAQicons() {
  return (
    <section>
      <div className={styles.container}>
        <div className={styles.iconsContainer}>
          <div className={styles.iconContainer}>
            <img
              src="https://s3.amazonaws.com/tw-helpdocs/svgs/projects/just-signed-icon.svg"
              alt=""
            />
            <h3>Getting Started</h3>
          </div>
          <div className={styles.iconContainer}>
            <img
              src="https://s3.amazonaws.com/tw-helpdocs/svgs/projects/Projects-settings.svg"
              alt=""
            />
            <h3>Using Teamwork</h3>
          </div>
          <div className={styles.iconContainer}>
            <img
              src="https://s3.amazonaws.com/tw-helpdocs/svgs/projects/projects-overview.svg"
              alt=""
            />
            <h3>Working with your projects</h3>
          </div>
          <div className={styles.iconContainer}>
            <img src="https://s3.amazonaws.com/tw-helpdocs/svgs/projects/integrations.svg" alt="" />
            <h3>Integrations</h3>
          </div>
          <div className={styles.iconContainer}>
            <img
              src="https://s3.amazonaws.com/tw-helpdocs/svgs/projects/projects-tips.svg"
              alt=""
            />
            <h3>Teamwork Tips</h3>
          </div>
          <div className={styles.iconContainer}>
            <img
              src="https://s3.amazonaws.com/tw-helpdocs/svgs/projects/advanced-settings.svg"
              alt=""
            />
            <h3>Teamwork Settings</h3>
          </div>
          <div className={styles.iconContainer}>
            <img
              src="https://s3.amazonaws.com/tw-helpdocs/svgs/projects/Working-as-a-team.svg"
              alt=""
            />
            <h3>Planning and Managing Work</h3>
          </div>
          <div className={styles.iconContainer}>
            <img
              src="https://s3.amazonaws.com/tw-helpdocs/svgs/projects/pricing-and-billing.svg"
              alt=""
            />
            <h3>Pricing and Billing</h3>
          </div>
          <div className={styles.iconContainer}>
            <img src="https://s3.amazonaws.com/tw-helpdocs/svgs/agency-icon.svg" alt="" />
            <h3>Agency and Professional Services</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
