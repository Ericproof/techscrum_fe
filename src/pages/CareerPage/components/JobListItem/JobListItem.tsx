import React from 'react';
import styles from './JobListItem.module.scss';

interface IJobListItem {
  title: string;
  department: string;
  id: string;
  desc: string;
  list: string[] | undefined;
}

const tagClassesMap = {
  developer: styles.pupple,
  devops: styles.orange,
  design: styles.red,
  product: styles.blue
};

function JobListItem(props: IJobListItem) {
  const { title, id, desc, list, department } = props;
  return (
    <div className={styles.careerCard} id={id}>
      <span className={[styles.tag, tagClassesMap[department.toLocaleLowerCase()]].join(' ')}>
        {department}
      </span>
      <h3>{title}</h3>
      <p className={styles.department}>{desc}</p>
      <ul>
        {list?.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
      <button className={styles.applyButtonText}>Apply now (WIP)</button>
    </div>
  );
}

export default JobListItem;
