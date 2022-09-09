/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useContext, useEffect, useState } from 'react';
import { RiMoreFill } from 'react-icons/ri';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import ProjectEditor from '../../components/ProjectEditor/ProjectEditor';
import styles from './Setting.module.scss';
import { deleteProject, showProject, updateProject } from '../../api/projects/projects';
import { IProjectEditor } from '../../types';
import { UserContext } from '../../context/UserInfoProvider';

export default function Setting() {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const { projectId = '' } = useParams();
  const [data, setData] = useState<IProjectEditor | null>(null);
  const [hasError, setError] = useState(false);
  const userInfo = useContext(UserContext);

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

  const onClickRemove = () => {
    setError(false);
    deleteProject(projectId)
      .then((res: any) => {
        if (res.status === 204) {
          navigate('/projects');
        }
      })
      .catch(() => {
        setError(true);
      });
  };

  if (!data) {
    return <></>;
  }
  return (
    <div className={styles.settingPage}>
      <div className={styles.settingContent}>
        <div className={styles.nav}>
          <div className={styles.navContent}>
            <ul>
              <li>
                <NavLink to="/projects">
                  <span>Projects</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={`/projects/${projectId}/board/${data.boardId}`}>
                  <span>{data.name}</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <header>
          <h1>Details</h1>
          {toggle ? (
            <div className={styles.openTrash}>
              <div className={styles.menuOpen}>
                <RiMoreFill onClick={() => setToggle(false)} />
              </div>
              <div className={styles.trash}>
                <button type="button" onClick={onClickRemove}>
                  Move to trash
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.menuClose}>
              <RiMoreFill onClick={() => setToggle(true)} />
            </div>
          )}
        </header>
        <ProjectEditor
          showCancelBtn
          projectData={data}
          onClickSave={onClickSave}
          hasError={hasError}
        />
      </div>
    </div>
  );
}
