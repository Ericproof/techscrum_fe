import React from 'react';
import styles from './HeaderNav.module.scss';

export default function HeaderNav() {
  return (
    <div>
      <nav className={styles.navLayout}>
        <ol>
          <li>
            <a href="/" target="_self">
              <span>Projects</span>
            </a>
          </li>
          <li>
            <a href="/" target="_self">
              <span>TECHSCRUM</span>
            </a>
          </li>
        </ol>
        <h1>TEC Sprint 7</h1>
      </nav>
    </div>
  );
}
