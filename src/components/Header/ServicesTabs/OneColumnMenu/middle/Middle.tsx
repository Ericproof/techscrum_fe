import React from 'react';
import { IconType } from 'react-icons';
import styles from './Middle.module.scss';

interface Props {
  Content: {
    title: string;
    content: Array<{
      icon: IconType;
      title: string;
      description: string;
      href: string;
    }>;
  };
}

export default function OneColumnMiddle({ Content }: Props) {
  return (
    <div className={styles.middle}>
      <h1>{Content.title}</h1>
      <div>
        {Content.content.map((service) => {
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
