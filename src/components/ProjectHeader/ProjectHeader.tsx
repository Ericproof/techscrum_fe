import React, { createRef, useContext } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { BiPlus } from 'react-icons/bi';
import { CgMenuGridR } from 'react-icons/cg';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import styles from './ProjectHeader.module.scss';
import useOutsideAlerter from '../../hooks/OutsideAlerter';
import PersonalProfile from './PersonalProfile/PersonalProfile';
import { IProject, IProjectData } from '../../types';
import { ProjectContext } from '../../context/ProjectProvider';
import { UserContext } from '../../context/UserInfoProvider';
import Icon from '../Header/IconTab/IconTab';

interface Props {
  projects: IProject[];
  updateProject: (index: number) => void;
  updateIsCreateNewCard: () => void;
}

export default function ProjectHeader({ projects, updateProject, updateIsCreateNewCard }: Props) {
  const projectList = useContext(ProjectContext);
  const userInfo = useContext(UserContext);
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const handleClickOutside = (state: boolean) => setVisible(!state);
  const navigate = useNavigate();
  const handleClickEvent = (e: React.MouseEvent<HTMLSpanElement>, project: IProjectData) => {
    e.preventDefault();
    const clickStartEventFlag = (e.target as Element).className.includes('Star');
    if (!clickStartEventFlag) {
      navigate(`/projects/${project.id}/board/${project.boardId}`);
    }
  };
  const refStar = projectList.map(() => createRef<HTMLDivElement>());
  const setProjectStar = (id: number) => {
    const index = projects.findIndex((project) => project.id === id);
    updateProject(index);
  };
  const getStarPosition = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const mouseStarPosition = e.currentTarget.getBoundingClientRect();
    const starPosition = {
      x: mouseStarPosition.left + window.scrollX,
      y: mouseStarPosition.top + window.scrollY
    };
    const { current } = refStar[id];
    if (current !== null) {
      current.style.top = `${starPosition.y - 24}px`;
      current.style.left = `${starPosition.x - 292}px`;
    }
  };

  return (
    <div className={styles.projectHeader}>
      <header>
        <nav ref={myRef}>
          <a href="/#">
            <div className={styles.logo}>
              <Icon />
            </div>
          </a>
          <div className={styles.options}>
            {visible ? (
              <>
                <div className={styles.optionProjects}>
                  <button type="button" onClick={() => handleClickOutside(true)}>
                    <span className={styles.title}>Projects</span>
                    <div className={styles.btn}>
                      <span>
                        <RiArrowDropDownLine />
                      </span>
                    </div>
                  </button>
                </div>
                <div className={styles.dropdownSection}>
                  <div className={styles.dropdownContainer}>
                    <div className={styles.top}>
                      <div className={styles.recent}>RECENT</div>
                      {projectList.slice(0, 2).map((project) => (
                        <a
                          href="/projects/"
                          onClick={(e) => handleClickEvent(e, project)}
                          key={project.id}
                        >
                          <span className={styles.iconSection}>
                            <div className={styles.iconContainer}>
                              <span className={styles.icon}>
                                <img
                                  src={
                                    project.icon ||
                                    'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10418?size=small'
                                  }
                                  alt="icon"
                                />
                              </span>
                            </div>
                          </span>
                          <span className={styles.titleContent}>
                            <span className={styles.name}>{project.name}</span>
                            <span className={styles.type}>{project.type}</span>
                          </span>
                          <div
                            className={styles.starSection}
                            onMouseOver={(e: React.MouseEvent<HTMLDivElement>) =>
                              getStarPosition(e, project.id)
                            }
                            onFocus={() => undefined}
                          >
                            <div className={styles.starContainer}>
                              {project.star ? (
                                <button
                                  type="button"
                                  className={styles.starBtn}
                                  onClick={() => setProjectStar(project.id)}
                                >
                                  <div className={styles.starContent}>
                                    <span className={styles.isStar}>
                                      <AiFillStar />
                                      <div
                                        className={styles.notification}
                                        ref={refStar[project.id]}
                                      >
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
                                  <div className={styles.starContent}>
                                    <span className={styles.unStar}>
                                      <AiOutlineStar />
                                      <div
                                        className={styles.notification}
                                        ref={refStar[project.id]}
                                      >
                                        Add to Starred
                                      </div>
                                    </span>
                                  </div>
                                </button>
                              )}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className={styles.bottom}>
                      <span className={styles.viewSection}>
                        <a href="/projects">
                          <span className={styles.link}>
                            <span>View all projects</span>
                          </span>
                        </a>
                        <a href="/create-projects">
                          <span className={styles.link}>
                            <span>Create project</span>
                          </span>
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.option}>
                <button type="button" onClick={() => handleClickOutside(false)}>
                  <span className={styles.title}>Projects</span>
                  <div className={styles.btn}>
                    <span>
                      <RiArrowDropDownLine />
                    </span>
                  </div>
                </button>
              </div>
            )}
            <div className={styles.option}>
              <button type="button">
                <span className={styles.title}>People</span>
                <div className={styles.btn}>
                  <span>
                    <RiArrowDropDownLine />
                  </span>
                </div>
              </button>
            </div>
            <div className={styles.createIssue}>
              <button
                type="button"
                className={styles.createBtn}
                onClick={updateIsCreateNewCard}
                style={{ display: 'none' }}
              >
                <span>Create</span>
              </button>
              <button
                type="button"
                className={styles.createIcon}
                onClick={updateIsCreateNewCard}
                style={{ display: 'none' }}
              >
                <span>
                  <BiPlus />
                </span>
              </button>
            </div>
            <div className={styles.spaceSection}>
              <div className={styles.space} />
            </div>
          </div>
        </nav>
        <PersonalProfile userInfo={userInfo} />
      </header>
    </div>
  );
}
