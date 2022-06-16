import React from 'react';
import ProjectLead from './ProjectLead/ProjectLead';
import Assignee from './Assignee/Assignee';
import styles from './ProjectEditor.module.scss';
import ChangeIcon from './ChangeIcon/ChangeIcon';
import ChangeName from './ChangeName/ChangeName';
import ChangeKey from './ChangeKey/ChangeKey';

export default function ProjectEditor() {
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
