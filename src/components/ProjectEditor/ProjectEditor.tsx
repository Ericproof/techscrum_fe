import React from 'react';
import Assignee from './Assignee/Assignee';
import ChangeIcon from './ChangeIcon/ChangeIcon';
import ChangeKey from './ChangeKey/ChangeKey';
import ChangeName from './ChangeName/ChangeName';
import styles from './ProjectEditor.module.scss';
import ProjectLead from './ProjectLead/ProjectLead';

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
