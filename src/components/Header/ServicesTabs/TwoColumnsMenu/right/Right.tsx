import React from 'react';
import styles from './Right.module.scss';

interface Props {
  rightContent: {
    title: string;
    content: Array<{
      title: string;
      href: string;
      hot: boolean;
    }>;
    btnContent: {
      content: string;
      href: string;
    };
  };
}

export default function left({ rightContent }: Props) {
  return (
    <div className={styles.right}>
      <h1>{rightContent.title}</h1>
      <div className={styles.rightServicesLists}>
        {rightContent.content.map((service) => {
          return (
            <a href={service.href} key={service.title}>
              {service.title} {service.hot ? <span>Popular</span> : ''}
            </a>
          );
        })}
      </div>
      <div className={styles.space} />
      <a className={styles.blueBtn} href={rightContent.btnContent.href}>
        {rightContent.btnContent.content}
      </a>
    </div>
  );
}
