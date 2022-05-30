import React from 'react';
import styles from './Left.module.scss';

interface Props {
  leftContent: {
    title: string;
    content: Array<{ title: string; description: string; href: string }>;
  };
}

export default function threeColumnsLeft({ leftContent }: Props) {
  return (
    <div className={styles.left}>
      <h1>{leftContent.title}</h1>
      <div>
        {leftContent.content.map((service) => {
          return (
            <div>
              <a href={service.href}>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
