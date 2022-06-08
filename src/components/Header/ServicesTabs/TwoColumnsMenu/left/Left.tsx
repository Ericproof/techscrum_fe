import React from 'react';
import { IconType } from 'react-icons';
import styles from './Left.module.scss';

interface Props {
  leftContent: {
    title: string;
    content: Array<{
      icon: IconType;
      title: string;
      description: string;
      href: string;
      hot: boolean;
    }>;
    btnContent: {
      content: string;
      href: string;
    };
  };
}

export default function left({ leftContent }: Props) {
  return (
    <div className={styles.left}>
      <h1>{leftContent.title}</h1>
      <div className={styles.leftServicesLists}>
        {leftContent.content.map((service) => {
          return (
            <div>
              <a href={service.href}>
                <service.icon />
                <div>
                  <h2>
                    {service.title} {service.hot ? <span>Popular</span> : ''}
                  </h2>
                  <p>{service.description}</p>
                </div>
              </a>
            </div>
          );
        })}
      </div>
      <div className={styles.space} />
      <a className={styles.pinkBtn} href={leftContent.btnContent.href}>
        {leftContent.btnContent.content}
      </a>
    </div>
  );
}
