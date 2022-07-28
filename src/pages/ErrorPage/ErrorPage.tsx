import React from 'react';
import styles from './ErrorPage.module.scss';

export default function ErrorPage() {
  return (
    <div className={styles.errorMain}>
      <div className={styles.errorContainer}>
        <div className={styles.errorTitle}>
          <h1>404</h1>
        </div>
        <div className={styles.picture}>
          <div className={styles.picture1}>
            <img
              src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/slider-shape.png"
              alt=""
            />
          </div>
          <div className={styles.picture2}>
            <img
              src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/slider-shape-2.png"
              alt=""
            />
          </div>
          <div className={styles.picture3}>
            <img
              src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/slider-shape-3.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
