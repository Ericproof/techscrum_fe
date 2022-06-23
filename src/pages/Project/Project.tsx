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

export default function Project() {
  const [projectList, setProjectList] = useState<any>([]);
  const [showProjectDetails, setShowProjectDetails] = useState(-1);
  const [value, setValue] = useState(0);
  const refStar = projectList.map(() => createRef<HTMLDivElement>());
  const refProfile = projectList.map(() => createRef<HTMLDivElement>());
  const refShowMore = projectList.map(() => createRef<HTMLDivElement>());
  const { visible, setVisible, myRef } = useOutsideAlerter(false);

  useEffect(() => {
    const fetchProjects = () => {
      const res = getProjects();
      const sortedResult = res.data.sort((a, b) => {
        return a.lastEditTime < b.lastEditTime ? 1 : -1;
      });
      setProjectList(sortedResult);
    };
    fetchProjects();
  }, []);

  const getProjectFromChildren = (id: number) => {
    projectList[id].star = !projectList[id].star;
    setValue(value + 1);
  };

  const setProjectStar = (id: number) => {
    const projectIndex = projectList.findIndex((project: any) => project.id === id);
    projectList[projectIndex].star = !projectList[projectIndex].star;
    setValue(value + 1);
  };

  const getStarPosition = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const mouseStarPosition = e.currentTarget.getBoundingClientRect();
    const starPosition = {
      x: mouseStarPosition.left + window.scrollX,
      y: mouseStarPosition.top + window.scrollY
    };
    const { current } = refStar[id];
    if (current !== null) {
      current.style.top = `${starPosition.y + 45}px`;
      current.style.left = `${starPosition.x - 33}px`;
    }
  };

  const getProfilePosition = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const mouseProfilePosition = e.currentTarget.getBoundingClientRect();
    const profilePosition = {
      x: mouseProfilePosition.left + window.scrollX,
      y: mouseProfilePosition.top + window.scrollY
    };
    const { current } = refProfile[id];
    if (current !== null) {
      current.style.top = `${profilePosition.y - 170}px`;
      current.style.left = `${profilePosition.x + 1}px`;
    }
  };

  const onCompletedSubmit = () => {
    setVisible(false);
  };

  const removeProject = (id: string) => {
    deleteProject(id);
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

  useEffect(() => {
    document.addEventListener('mousedown', handleClickInside);
    return () => document.removeEventListener('mousedown', handleClickInside);
  });

  return (
    <>
      <ProjectHeader projects={projectList} updateProject={getProjectFromChildren} />
      {visible && (
        <div className={styles.modalContainer} ref={myRef}>
          <div className={styles.modal}>
            <ProjectEditor onCompletedSubmit={onCompletedSubmit} />
          </div>
        </div>
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
                    <tr key={project.id}>
                      <td className={styles.star}>
                        <div
                          className={styles.changeStar}
                          onMouseOver={(e: React.MouseEvent<HTMLDivElement>) =>
                            getStarPosition(e, project.id)
                          }
                          onFocus={() => undefined}
                        >
                          <span>
                            {project.star ? (
                              <button
                                type="button"
                                className={styles.starBtn}
                                onClick={() => setProjectStar(project.id)}
                              >
                                <div className={styles.starStyle}>
                                  <span className={styles.isStar}>
                                    <AiFillStar />
                                    <div className={styles.notification} ref={refStar[project.id]}>
                                      Remove from Starred
                                    </div>
                                  </span>
                                </div>
                              </button>
                            ) : (
                              <button
                                type="button"
                                className={styles.unStarBtn}
                                onClick={() => setProjectStar(project.id)}
                              >
                                <div className={styles.starStyle}>
                                  <span className={styles.unStar}>
                                    <AiOutlineStar />
                                    <div className={styles.notification} ref={refStar[project.id]}>
                                      Add to Starred
                                    </div>
                                  </span>
                                </div>
                              </button>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className={styles.name}>
                        <Link to="/board">
                          <div className={styles.nameContent}>
                            <img src={project.icon} alt="icon" />
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
                      <td className={styles.lead}>
                        <div
                          className={styles.leadContainer}
                          onMouseOver={(e: React.MouseEvent<HTMLDivElement>) =>
                            getProfilePosition(e, project.id)
                          }
                          onFocus={() => undefined}
                        >
                          <div className={styles.leadContent}>
                            <a href="/#">
                              <div className={styles.leadInfo}>
                                <div className={styles.avatar}>
                                  <span>
                                    <span className={styles.avatarImg} />
                                  </span>
                                </div>
                                <span>{project.lead}</span>
                              </div>
                              <div className={styles.profileSection} ref={refProfile[project.id]}>
                                <div className={styles.profileContainer}>
                                  <div className={styles.profileContent}>
                                    <div className={styles.avatar}>
                                      <img src={project.avatar} alt="avatar" />
                                    </div>
                                    <div className={styles.name}>
                                      <span>{project.lead}</span>
                                    </div>
                                    <div className={styles.viewProfile}>
                                      <Link to="/user-page">
                                        <button type="button">View profile</button>
                                      </Link>
                                    </div>
                                  </div>
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
                        {showProjectDetails === project.id && (
                          <div className={styles.viewDetail} ref={refShowMore[index]}>
                            <Link to="/settings">
                              <button type="button">View Detail</button>
                            </Link>
                            <button type="button" onClick={() => removeProject(project.id)}>
                              Delete Project
                            </button>
                          </div>
                        )}
                        <HiDotsHorizontal
                          onClick={() => {
                            setShowProjectDetails(project.id);
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
