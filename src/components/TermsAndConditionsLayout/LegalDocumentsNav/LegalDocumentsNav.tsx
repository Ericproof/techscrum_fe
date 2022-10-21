import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import styles from './LegalDocumentsNav.module.scss';

export interface ICustomLink {
  to: string;
  children: string;
}

function CustomLink({ to, children }: ICustomLink) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? `${styles.active}` : ''}>
      <Link to={to}>{children}</Link>
    </li>
  );
}

export default function LegalDocumentsNav() {
  return (
    <div className={styles.navContainer}>
      <h4>
        <CustomLink to="/">Our Legal Documents</CustomLink>
      </h4>
      <ul>
        <CustomLink to="/cookie-policy">Cookie Policy</CustomLink>
        <CustomLink to="/gdpr">GDPR Compliance</CustomLink>
        <CustomLink to="/privacy-policy">Privacy Policy</CustomLink>
        <CustomLink to="/privacy-statement">Privacy Statement</CustomLink>
        <CustomLink to="/refund-policy">Refund Policy</CustomLink>
        <CustomLink to="/terms-of-service">Terms of Service</CustomLink>
      </ul>
    </div>
  );
}
