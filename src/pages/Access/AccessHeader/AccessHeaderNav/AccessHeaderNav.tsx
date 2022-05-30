import React from 'react';
import style from './accessHeaderNav.module.scss';

export default function AccessHeaderNav() {
  return (
    <div>
      <nav className={style.navLayout}>
        <ol>
          <li>
            <a href="/access" target="_self">
              <span>Projects</span>
            </a>
          </li>
          <li>
            <a href="/access" target="_self">
              <span>EvanLin</span>
            </a>
          </li>
          <li>
            <a href="/access" target="_self">
              <span>Project settings</span>
            </a>
          </li>
        </ol>
      </nav>
    </div>
  );
}
