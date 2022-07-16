import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectEditor from '../../components/ProjectEditor/ProjectEditor';
import styles from './CreateProject.module.scss';

export default function CreateProject() {
  const navigate = useNavigate();
  return (
    <div className={styles.createProjectPage}>
      <ProjectEditor
        showCancelBtn
        onCompletedSubmit={() => {
          navigate('/projects');
        }}
      />
    </div>
  );
}
