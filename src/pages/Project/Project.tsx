/* eslint-disable no-underscore-dangle */
import React, { useState, createRef, useEffect } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { HiDotsHorizontal } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styles from './Project.module.scss';
import ProjectHeader from '../../components/ProjectHeader/ProjectHeader';
import { getProjects, deleteProject } from '../../api/projects/projects';
import ProjectEditor from '../../components/ProjectEditor/ProjectEditor';
import useOutsideAlerter from '../../hooks/OutsideAlerter';
import CreateNewCard from '../../components/Card/Card';

export default function Project() {
  const [projectList, setProjectList] = useState<any>([]);
  const [showProjectDetails, setShowProjectDetails] = useState(-1);
  const [value, setValue] = useState(0);
  const refProfile = projectList.map(() => createRef<HTMLDivElement>());
  const refShowMore = projectList.map(() => createRef<HTMLDivElement>());
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const [isCreateNewCard, setIsCreateNewCard] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await getProjects();
      // const sortedResult = res.data.sort((a, b) => {
      //   return a.lastEditTime < b.lastEditTime ? 1 : -1;
      // });
      if (!res.data) {
        return;
      }
      setProjectList(res.data);
    };
    fetchProjects();
  }, []);

  const getProjectFromChildren = (id: number) => {
    projectList[id].star = !projectList[id].star;
    setValue(value + 1);
  };

  const setProjectStar = (id: number) => {
    const projectIndex = projectList.findIndex((project: any) => project._id === id);
    projectList[projectIndex].star = !projectList[projectIndex].star;
    setValue(value + 1);
  };

  const onCompletedSubmit = (res: any) => {
    setVisible(false);
    const updateProjectList = [...projectList, ...[res.data]];
    setProjectList(updateProjectList);
  };

  const removeProject = (id: string) => {
    deleteProject(id).then((res: any) => {
      if (res.status === 204) {
        const updateProjectList = projectList.filter((item: any) => item._id !== id);
        setProjectList(updateProjectList);
      }
    });
  };

  const viewDetailPosition = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const mouseDetailPosition = e.currentTarget.getBoundingClientRect();

    const viewPosition = {
      x: mouseDetailPosition.left + window.scrollX,
      y: mouseDetailPosition.top + window.scrollY
    };
    const { current } = refProfile[id];
    if (current !== null) {
      current.style.top = `${viewPosition.y - 170}px`;
      current.style.left = `${viewPosition.x + 50}px`;
    }
  };

  const handleClickInside = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    let hasClickShowMore = false;
    for (let i = 0; i < refShowMore.length; i += 1) {
      if (refShowMore[i].current !== null && refShowMore[i].current.contains(target)) {
        hasClickShowMore = true;
      }
    }
    if (hasClickShowMore === false) {
      setShowProjectDetails(-1);
    }
  };

  const getCreateNewCardStateFromChildren = () => {
    setIsCreateNewCard(!isCreateNewCard);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickInside);
    return () => document.removeEventListener('mousedown', handleClickInside);
  });

  return (
    <>
      <ProjectHeader
        projects={projectList}
        updateProject={getProjectFromChildren}
        updateIsCreateNewCard={getCreateNewCardStateFromChildren}
      />
      {visible && (
        <div className={styles.modalContainer} ref={myRef}>
          <div className={styles.modal}>
            <ProjectEditor onCompletedSubmit={onCompletedSubmit} />
          </div>
        </div>
      )}
      {isCreateNewCard && (
        <CreateNewCard updateIsCreateNewCard={getCreateNewCardStateFromChildren} />
      )}
      <div className={styles.projectPage}>
        <div className={styles.projectContainer}>
          <div className={styles.projectContent}>
            <div className={styles.header}>
              <div className={styles.title}>
                <h1>Projects</h1>
                <button
                  type="button"
                  className={styles.createButton}
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  Create project
                </button>
              </div>
              <div className={styles.searchBar}>
                <input />
                <div className={styles.searchIcon}>
                  <span>
                    <FiSearch />
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.mainContent}>
              <table aria-label="Projects details">
                <thead>
                  <tr>
                    <th className={styles.stars}>
                      <span>
                        <AiFillStar />
                      </span>
                    </th>
                    <th className={styles.names}>
                      <span>Name</span>
                    </th>
                    <th className={styles.keys}>
                      <span>Key</span>
                    </th>
                    <th className={styles.types}>
                      <span>Type</span>
                    </th>
                    <th className={styles.leads}>
                      <span>Lead</span>
                    </th>
                    <th className={styles.buttons}>
                      <span />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projectList.map((project: any, index: number) => (
                    <tr key={project._id} className={styles.overflowVisible}>
                      <td className={[styles.star, styles.overflowVisible].join(' ')}>
                        <div
                          className={[styles.changeStar, styles.overflowVisible].join(' ')}
                          onFocus={() => undefined}
                        >
                          <span>
                            {project.star ? (
                              <button
                                type="button"
                                className={[styles.starBtn, styles.overflowVisible].join(' ')}
                                onClick={() => setProjectStar(project._id)}
                              >
                                <div
                                  className={[styles.starStyle, styles.overflowVisible].join(' ')}
                                >
                                  <span className={styles.isStar}>
                                    <AiFillStar />
                                    <div className={styles.notification}>Remove from Starred</div>
                                  </span>
                                </div>
                              </button>
                            ) : (
                              <button
                                type="button"
                                className={[styles.unStarBtn, styles.overflowVisible].join(' ')}
                                onClick={() => setProjectStar(project._id)}
                              >
                                <div
                                  className={[styles.starStyle, styles.overflowVisible].join(' ')}
                                >
                                  <span className={styles.unStar}>
                                    <AiOutlineStar />
                                    <div className={styles.notification}>Add to Starred</div>
                                  </span>
                                </div>
                              </button>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className={styles.name}>
                        <Link to={`/projects/${project._id}/board/${project.board_id}`}>
                          <div className={styles.nameContent}>
                            <img
                              src={
                                project.icon ||
                                'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10418?size=small'
                              }
                              alt="icon"
                            />
                            <span>{project.name}</span>
                          </div>
                        </Link>
                      </td>
                      <td className={styles.key}>
                        <span className={styles.keyName}>{project.key}</span>
                      </td>
                      <td className={styles.type}>
                        <div className={styles.typeContent}>
                          <span>{project.type}</span>
                        </div>
                      </td>
                      <td className={[styles.lead, styles.overflowVisible].join(' ')}>
                        <div className={styles.leadContainer} onFocus={() => undefined}>
                          <div className={styles.leadContent}>
                            <a
                              href="/#"
                              className={[styles.overflowVisible, styles.relative].join(' ')}
                            >
                              <div className={styles.leadInfo}>
                                <div className={styles.avatar}>
                                  <span>
                                    <span className={styles.avatarImg} />
                                  </span>
                                </div>
                                <span>{project.lead}</span>
                              </div>
                              <div className={[styles.absolute, styles.profileV2].join(' ')}>
                                <div className={styles.profileV2Header}>
                                  <img
                                    className={styles.profileV2Image}
                                    src={
                                      project.avatar ||
                                      'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
                                    }
                                    alt="avatar"
                                  />
                                  <p>{project.lead || 'hi'}</p>
                                </div>
                                <div className={[styles.profileV2Link, styles.textRight].join(' ')}>
                                  <Link to="/user-page">
                                    <button type="button">View profile</button>
                                  </Link>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </td>
                      <td
                        className={styles.changeView}
                        onMouseOver={(e: React.MouseEvent<HTMLDivElement>) =>
                          viewDetailPosition(e, index)
                        }
                        onFocus={() => undefined}
                      >
                        {showProjectDetails === project._id && (
                          <div className={styles.viewDetail} ref={refShowMore[index]}>
                            <Link to="/settings">
                              <button type="button">View Detail</button>
                            </Link>
                            <button type="button" onClick={() => removeProject(project._id)}>
                              Delete Project
                            </button>
                          </div>
                        )}
                        <HiDotsHorizontal
                          onClick={() => {
                            setShowProjectDetails(project._id);
                          }}
                          className={styles.verticalMiddle}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
