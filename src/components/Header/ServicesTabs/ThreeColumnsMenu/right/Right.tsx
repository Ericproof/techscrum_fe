import React from 'react';
import { IconType } from 'react-icons';
import styles from './Right.module.scss';

interface Props {
  rightContent: {
    title: string;
    content: Array<{
      icon: IconType;
      title: string;
      description: string;
      href: string;
    }>;
    btnContent: {
      content: string;
      href: string;
    };
  };
}

export default function threeColumnsRight({ rightContent }: Props) {
  return (
    <div className={styles.right}>
      <h1>{rightContent.title}</h1>
      <div>
        {rightContent.content.map((service) => {
          return (
            <div key={service.title}>
              <a href={service.href}>
                <service.icon />
                <div>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                </div>
              </a>
            </div>
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
