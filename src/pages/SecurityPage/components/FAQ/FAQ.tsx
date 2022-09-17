import React from 'react';
import { FaRegPlusSquare } from 'react-icons/fa';
import styles from './FAQ.module.scss';

export default function Certifications() {
  return (
    <div className={styles.FAQRoot}>
      <h3>Frequently asked questions</h3>
      <div className={styles.FAQDetailesContainer}>
        <div className={styles.FAQDetailes}>
          <div className={styles.Qcontainer}>
            <h4>Where are your servers located?</h4>
          </div>
          <div className={styles.IconContainer}>
            <FaRegPlusSquare className={styles.PlusIcon} />
          </div>
        </div>

        <hr className={styles.breaker} />

        <div className={styles.FAQDetailes}>
          <div className={styles.Qcontainer}>
            <h4>Who has access to the servers?</h4>
          </div>
          <div className={styles.IconContainer}>
            <FaRegPlusSquare className={styles.PlusIcon} />
          </div>
        </div>

        <hr className={styles.breaker} />

        <div className={styles.FAQDetailes}>
          <div className={styles.Qcontainer}>
            <h4>What about physical security?</h4>
          </div>
          <div className={styles.IconContainer}>
            <FaRegPlusSquare className={styles.PlusIcon} />
          </div>
        </div>

        <hr className={styles.breaker} />

        <div className={styles.FAQDetailes}>
          <div className={styles.Qcontainer}>
            <h4>Where can I find your uptime report?</h4>
          </div>
          <div className={styles.IconContainer}>
            <FaRegPlusSquare className={styles.PlusIcon} />
          </div>
        </div>

        <hr className={styles.breaker} />

        <div className={styles.FAQDetailes}>
          <div className={styles.Qcontainer}>
            <h4>Where do I report a security concern?</h4>
          </div>
          <div className={styles.IconContainer}>
            <FaRegPlusSquare className={styles.PlusIcon} />
          </div>
        </div>

        <hr className={styles.breaker} />

        <div className={styles.FAQInfoContainer}>
          <div className={styles.desc}>
            <p>
              Have a question that we haven’t answered here? We’d love to talk to you. Get in touch
              with us by emailing <a href="mailto:support@teamwork.com">support@teamwork.com</a>
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <button>More Information</button>
          </div>
        </div>
      </div>
    </div>
  );
}
