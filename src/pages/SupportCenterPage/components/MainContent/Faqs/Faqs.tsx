import React from 'react';
import styles from './Faqs.module.scss';
import Questions from './FaqsQuestions';

export default function Faqs() {
  return (
    <div className={styles.faqs}>
      <div className={styles.title}>Frequently asked questions</div>
      <div className={styles.faqsContainer}>
        <Questions />
        <div className={styles.moreInfo}>
          <a href="https://support.teamwork.com/projects">More information</a>
        </div>
        {/* <div className={styles.faqsContents}>
          <div className={styles.faqsContent}>
            <h4>Where are your servers located?</h4>
            <span>1</span>
          </div>
          <div className={styles.faqsAnswer}>
            Our servers are with Amazon Web Services AWS and are hosted within the US and the EU.
            For more information on AWS, click here.
          </div>
          <div className={styles.faqsContent}>
            <h4>Who has access to the servers?</h4>
            <span>1</span>
          </div>
          <div className={styles.faqsAnswer}>
            Only certain members of our team have authorization to access the servers. We never
            breach customer confidentiality.
          </div>
          <div className={styles.faqsContent}>
            <h4>What about physical security?</h4>
            <span>1</span>
          </div>
          <div className={styles.faqsAnswer}>
            AWS infrastructure is housed in Amazon-controlled data centers throughout the world.
            Only those within Amazon who have a legitimate business need to have such information
            know the actual location of these data centers.
          </div>
          <div className={styles.faqsContent}>
            <h4>Where can I find your uptime report?</h4>
            <span>1</span>
          </div>
          <div className={styles.faqsAnswer}>
            You can see the latest uptime report https://status.teamwork.com/.
          </div>
          <div className={styles.faqsContent}>
            <h4>Where do I report a security concern?</h4>
            <span>1</span>
          </div>
          <div className={styles.faqsAnswer}>
            You can report a security concern by emailing us at security@teamwork.com.
          </div>
          <div className={styles.moreInfo}>
            <a href="https://support.teamwork.com/projects">More information</a>
          </div>
        </div> */}
      </div>
    </div>
  );
}
