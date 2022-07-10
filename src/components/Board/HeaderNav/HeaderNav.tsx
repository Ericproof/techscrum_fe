import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HeaderNav.module.scss';

interface IHeaderProps {
  name: string;
}

export default function HeaderNav(props: IHeaderProps) {
  const { name } = props;
  return (
    <div>
      <nav className={styles.navLayout}>
        <ol>
          <li>
            <NavLink to="/projects" className={({ isActive }) => (isActive ? 'none' : 'none')}>
              <span>Projects</span>
            </NavLink>
          </li>
        </ol>
        <h1>TEC Sprint 7</h1>
      </nav>
    </div>
  );
}
