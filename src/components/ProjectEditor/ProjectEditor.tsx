import React, { useState } from 'react';
import Assignee from './Assignee/Assignee';
import ChangeIcon from './ChangeIcon/ChangeIcon';
import ChangeKey from './ChangeKey/ChangeKey';
import ChangeName from './ChangeName/ChangeName';
import styles from './ProjectEditor.module.scss';
import ProjectLead from './ProjectLead/ProjectLead';
import { createProject } from '../../api/projects/projects';

interface ProjectEditorProps {
  onCompletedSubmit?: () => void;
}

function ProjectEditor(props: ProjectEditorProps) {
  const [data, setData] = useState<any>({ name: '', key: '', project_lead_id: 1, assignee_id: 1 });
  const [hasError, setError] = useState(false);
  const { onCompletedSubmit = null } = props;
  const onChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateData = {
      [e.target.name]: e.target.value,
      key: e.target.value.substring(0, 3).toUpperCase()
    };

    setData({ ...data, ...updateData });
  };

  const onSave = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createProject(data)
      .then((res: any) => {
        if (!res.data) {
          return;
        }
        setError(false);
        if (onCompletedSubmit) {
          onCompletedSubmit();
        }
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <div className={styles.editSection}>
      <div className={styles.editContainer}>
        <form>
          <ChangeIcon />
          <ChangeName value={data.name} onChange={onChangeName} />
          <ChangeKey value={data.key} onChange={onChange} />
          <ProjectLead value={data.projectLead} onChange={onChange} />
          <Assignee value={data.assignee} onChange={onChange} />
          {hasError && <p className={styles.error}>Error</p>}
          <button className={styles.saveBtn} type="submit" onClick={onSave}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

ProjectEditor.defaultProps = {
  onCompletedSubmit: null
};

export default ProjectEditor;
