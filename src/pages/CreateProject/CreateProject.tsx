import React from 'react';
import Assignee from '../../components/ProjectEditor/Assignee/Assignee';
import ChangeIcon from '../../components/ProjectEditor/ChangeIcon/ChangeIcon';
import ChangeKey from '../../components/ProjectEditor/ChangeKey/ChangeKey';
import ChangeName from '../../components/ProjectEditor/ChangeName/ChangeName';
import ProjectLead from '../../components/ProjectEditor/ProjectLead/ProjectLead';
import styles from './CreateProject.module.scss';

export default function CreateProject() {
  return (
    <div className={styles.editSection}>
      <div className={styles.editContainer}>
        <form>
          <ChangeIcon />
          <ChangeName />
          <ChangeKey />
          <ProjectLead />
          <Assignee />
          <button className={styles.saveBtn} type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
