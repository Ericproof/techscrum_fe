import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import Assignee from './Assignee/Assignee';
import ChangeIcon from './ChangeIcon/ChangeIcon';
import ChangeKey from './ChangeKey/ChangeKey';
import ChangeName from './ChangeName/ChangeName';
import styles from './ProjectEditor.module.scss';
import ProjectLead from './ProjectLead/ProjectLead';
import { createProject } from '../../api/projects/projects';
import { IOnChangeProjectLead, IProjectEditor } from '../../types';

interface ProjectEditorProps {
  onCompletedSubmit?: (res: AxiosResponse) => void;
  showCancelBtn?: boolean;
}

function ProjectEditor(props: ProjectEditorProps) {
  const [data, setData] = useState<IProjectEditor>({
    name: '',
    key: '',
    projectLeadId: 1,
    assigneeId: 1
  });
  const [hasError, setError] = useState(false);
  const navigate = useNavigate();
  const { onCompletedSubmit = null, showCancelBtn = false } = props;
  const onChange = (e: IOnChangeProjectLead) => {
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
      .then((res: AxiosResponse) => {
        if (!res.data) {
          return;
        }
        setError(false);
        if (onCompletedSubmit) {
          onCompletedSubmit(res);
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
          <ProjectLead onChange={onChange} />
          <Assignee onChange={onChange} />
          {hasError && <p className={styles.error}>Error</p>}
          <button className={styles.saveBtn} type="submit" onClick={onSave}>
            Save
          </button>
          {showCancelBtn && (
            <button
              className={styles.cancelBtn}
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

ProjectEditor.defaultProps = {
  onCompletedSubmit: null,
  showCancelBtn: false
};

export default ProjectEditor;
