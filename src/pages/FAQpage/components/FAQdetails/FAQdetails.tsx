import React from 'react';
import styles from './FAQdetails.module.scss';
import FAQbutton from '../FAQbutton/FAQbutton';

interface IMember {
  links: string[];
  title: string;
}
export default function FAQdetails(props: IMember) {
  const { links, title } = props;
  return (
    <section>
      <div className={styles.container}>
        <div className={styles.sectionContainer}>
          <h1>{title}</h1>
          <div className={styles.infoContainer}>
            {links.map((link) => {
              return (
                <div className={styles.singleInfoContainer}>
                  <p>{link}</p>
                </div>
              );
            })}
          </div>
          {title !== 'Planning and Managing Work' && <FAQbutton />}
        </div>
      </div>
    </section>
  );
}
