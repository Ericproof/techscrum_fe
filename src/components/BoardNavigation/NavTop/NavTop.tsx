import React from 'react';
import styles from './NavTop.module.scss';

export default function NavTop() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img
          src="https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10411?size=xxlarge"
          alt="img"
        />
        <div className={styles.textContext}>
          <h2 className={styles.clearMargin}>TECHSCRUM</h2>
          <span>Software project</span>
        </div>
      </div>
    </div>
  );
}
