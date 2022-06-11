import React from 'react';
import { IconType } from 'react-icons';
import styles from './Middle.module.scss';

interface Props {
  middleContent: {
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

export default function threeColumnMiddle({ middleContent }: Props) {
  return (
    <div className={styles.middle}>
      <h1>{middleContent.title}</h1>
      <div>
        {middleContent.content.map((service) => {
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
      <a className={styles.pinkBtn} href={middleContent.btnContent.href}>
        {middleContent.btnContent.content}
      </a>
    </div>
  );
}
