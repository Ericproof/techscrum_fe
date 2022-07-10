import React from 'react';
import ProjectEditor from '../../components/ProjectEditor/ProjectEditor';
import styles from './CreateProject.module.scss';

export default function CreateProject() {
  return (
    <div className={styles.createProjectPage}>
      <ProjectEditor showCancelBtn />
    </div>
  );
}
