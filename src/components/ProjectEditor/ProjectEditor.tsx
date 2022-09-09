/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import ChangeIcon from './ChangeIcon/ChangeIcon';
import ChangeKey from './ChangeKey/ChangeKey';
import ChangeName from './ChangeName/ChangeName';
import styles from './ProjectEditor.module.scss';
import ProjectLead from './ProjectLead/ProjectLead';
import { IOnChangeProjectLead, IProjectEditor } from '../../types';
import { UserContext } from '../../context/UserInfoProvider';

interface ProjectEditorProps {
  onCompletedSubmit?: (res: AxiosResponse) => void;
  showCancelBtn?: boolean;
  projectData?: IProjectEditor;
  onClickSave: (data: any) => void;
  hasError: boolean;
}

function ProjectEditor(props: ProjectEditorProps) {
  const [data, setData] = useState<IProjectEditor>({
    name: '',
    key: '',
    projectLeadId: 1,
    assigneeId: 1,
    iconUrl: ''
  });
  const navigate = useNavigate();
  const userInfo = useContext(UserContext);

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    setData({ ...data, projectLeadId: userInfo });
  }, [userInfo.id]);

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onCompletedSubmit = null,
    showCancelBtn = false,
    projectData,
    onClickSave,
    hasError
  } = props;
  const onChange = (e: IOnChangeProjectLead) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!projectData) {
      return;
    }
    setData(projectData);
  }, [projectData]);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateData = {
      [e.target.name]: e.target.value,
      key: e.target.value.substring(0, 3).toUpperCase()
    };

    setData({ ...data, ...updateData });
  };

  const onSave = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const apiData = { ...data };
    apiData.projectLeadId = data.projectLeadId?.id;
    onClickSave(apiData);
  };

  const uploadSuccess = (photoData: any) => {
    const updateData = { ...data };
    updateData.iconUrl = photoData[0].location;
    setData(updateData);
  };

  return (
    <div className={styles.editSection}>
      <div className={styles.editContainer}>
        <form>
          <ChangeIcon uploadSuccess={uploadSuccess} value={data.iconUrl} />
          <ChangeName value={data.name} onChange={onChangeName} />
          <ChangeKey value={data.key} onChange={onChange} />
          <ProjectLead value={data.projectLeadId} onChange={onChange} />
          {hasError && (
            <p className={styles.error} data-testid="projectError">
              Error
            </p>
          )}
          <button className={styles.saveBtn} type="submit" data-testid="save" onClick={onSave}>
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
  showCancelBtn: false,
  projectData: null
};

export default ProjectEditor;
