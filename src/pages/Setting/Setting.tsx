/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import ProjectEditor from '../../components/ProjectEditor/ProjectEditor';
import styles from './Setting.module.scss';
import { showProject, updateProject } from '../../api/projects/projects';
import { IOnChangeProjectLead, IProjectEditor } from '../../types';
import { UserContext } from '../../context/UserInfoProvider';
import Navigation from '../../components/BoradNavigationV2/Navigation';
import SubSettingMenu from '../../components/SubSettingMenu/SubSettingMenu';
import InputV2 from '../../components/FormV2/InputV2/InputV2';
import SettingCard from '../../components/SettingCard/SettingCard';
import ChangeIcon from '../../components/ProjectEditor/ChangeIcon/ChangeIcon';
import DropdownV2 from '../../components/FormV2/DropdownV2/DropdownV2';
import { getUsers } from '../../api/user/user';

export default function Setting() {
  const navigate = useNavigate();
  const { projectId = '' } = useParams();
  const [data, setData] = useState<IProjectEditor | null>(null);
  const [hasError, setError] = useState(false);
  const userInfo = useContext(UserContext);
  const [userList, setUserList] = useState<any>([]);

  useEffect(() => {
    if (Object.keys(userInfo).length === 0 || !userInfo) {
      return;
    }
    const token = userInfo?.token;
    if (!token) {
      return;
    }
    showProject(projectId, token)
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        if (e.response.status === 403) {
          navigate('/unauthorize');
        }
      });
  }, [projectId, userInfo.token, userInfo]);

  useEffect(() => {
    const getUsersList = async () => {
      if (userList.length === 0) {
        const res = await getUsers();
        setUserList(res.data);
      }
    };
    getUsersList();
  }, [userList]);

  const onClickSave = (projectData: IProjectEditor) => {
    if (!projectData) {
      return;
    }
    const token = userInfo?.token || '';
    updateProject(projectId, projectData, token)
      .then((res: AxiosResponse) => {
        if (!res.data) {
          return;
        }
        setError(false);
        navigate('/projects');
      })
      .catch(() => {
        setError(true);
      });
  };

  const uploadSuccess = (photoData: any) => {
    const updateData = { ...data };
    updateData.iconUrl = photoData[0].location;
    setData(updateData);
  };

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

  if (!data) {
    return <></>;
  }
  return (
    <div className={styles.settingPage} data-testid="setting-page">
      <Navigation />
      <SubSettingMenu />
      <div className={styles.settingContainer}>
        <div className={styles.settingMiniContainer}>
          <header>
            <h1 className={styles.headerText}>Project Settings</h1>
            <hr className={styles.divider} />
          </header>
          <SettingCard title="Personal Information">
            <ChangeIcon uploadSuccess={uploadSuccess} value={data.iconUrl} />
            <div className={[styles.gap, styles.row, 'flex'].join(' ')}>
              <InputV2
                label="Project Name"
                onValueChanged={onChangeName}
                onValueBlur={() => {}}
                defaultValue={data.name}
                name="Project Name"
              />
              <InputV2
                label="Project Key"
                onValueChanged={onChange}
                onValueBlur={() => {}}
                defaultValue={data.key}
                name="projectKey"
              />
            </div>
            <div className={[styles.gap, styles.row, 'flex'].join(' ')}>
              <DropdownV2
                label="Project Lead"
                onValueChanged={onChange}
                onValueBlur={() => {}}
                defaultValue={data.projectLeadId.id}
                name="projectLead"
                options={userList.map((item) => {
                  return {
                    label: item.name,
                    value: item.id
                  };
                })}
              />
              <InputV2
                label="Website URL"
                onValueChanged={() => {}}
                onValueBlur={() => {}}
                defaultValue=""
                name="websiteURL"
              />
            </div>
            <div className={[styles.gap, styles.row, 'flex'].join(' ')}>
              <InputV2
                label="Description"
                onValueChanged={() => {}}
                onValueBlur={() => {}}
                defaultValue=""
                name="description"
              />
            </div>
          </SettingCard>
          <SettingCard title="Change Password">
            <div className={[styles.gap, styles.row, 'flex'].join(' ')}>
              <InputV2
                label="New Password"
                onValueChanged={() => {}}
                onValueBlur={() => {}}
                defaultValue=""
                name="newPassword"
                type="password"
              />
              <InputV2
                label="Confirm Password"
                onValueChanged={() => {}}
                onValueBlur={() => {}}
                defaultValue=""
                name="confirmPassword"
                type="password"
              />
            </div>
          </SettingCard>
          <SettingCard title="Delete Account">
            <p>Delete your account and all of your source data. This is irreversible.</p>
          </SettingCard>
          <ProjectEditor
            showCancelBtn
            projectData={data}
            onClickSave={onClickSave}
            hasError={hasError}
          />
        </div>
      </div>
    </div>
  );
}
