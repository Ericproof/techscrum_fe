import React from 'react';
import styles from './FAQDetails.module.scss';
import FAQButton from '../FAQButton/FAQButton';

interface IMember {
  links: string[];
  title: string;
}
export default function FAQDetails(props: IMember) {
  const { links, title } = props;
  return (
    <section className={styles.FAQdetails}>
      <div className={styles.container}>
        <div className={styles.sectionContainer}>
          <h1 className={styles.linkTitle}>{title}</h1>
          <div className={styles.infoContainer}>
            {links.map((link) => {
              return (
                <div className={styles.singleInfoContainer}>
                  <p>{link}</p>
                </div>
              );
            })}
          </div>
          {title !== 'Planning and Managing Work' && <FAQButton />}
        </div>
      </div>
    </section>
  );
}
