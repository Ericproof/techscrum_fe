import React from 'react';
import styles from './RegisterFooter.module.scss';
import Icon from '../icon.png';

export default function RegisterFooter() {
  return (
    <div className={styles.registerFooter}>
      <img src={Icon} alt="TechScrum Icon" />
      <p>
        One account to access TechScrum, Confluence, Trello, and <a href="/#">more.</a>
      </p>
    </div>
  );
}
