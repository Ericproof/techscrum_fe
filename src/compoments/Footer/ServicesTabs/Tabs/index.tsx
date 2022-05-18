import React from 'react';
import styles from './index.module.scss';

interface Props {
  services: {
    title: string;
    contents: Array<{ href: string; item: string }>;
  };
}

export default function tab({ services }: Props) {
  return (
    <div className={styles.service}>
      <h1 className={styles.title}>
        {services.title}
        <span>+</span>
      </h1>
      <ul>
        {services.contents.map((serviceItem) => (
          <li>
            <a href={serviceItem.href}>{serviceItem.item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
