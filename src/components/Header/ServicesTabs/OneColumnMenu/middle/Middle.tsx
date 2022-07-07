import React from 'react';
import { IconType } from 'react-icons';
import styles from './Middle.module.scss';

interface Props {
  content: {
    title: string;
    content: Array<{
      icon: IconType;
      title: string;
      description: string;
      href: string;
    }>;
  };
}

export default function OneColumnMiddle({ content }: Props) {
  return (
    <div className={styles.middle}>
      <h1>{content.title}</h1>
      <div>
        {content.content.map((service) => {
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
    </div>
  );
}
