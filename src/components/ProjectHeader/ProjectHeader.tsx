import React, { useState, createRef } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { BiPlus } from 'react-icons/bi';
import { CgMenuGridR } from 'react-icons/cg';
import { RiArrowDropDownLine } from 'react-icons/ri';
import styles from './ProjectHeader.module.scss';
import UseOutsideAlerter from '../OutsideAlerter/OutsideAlerter';
import PersonalProfile from './PersonalProfile/PersonalProfile';

const projects = [
  {
    id: 0,
    name: 'TECHSCRUM (TEC)',
    icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10411?size=medium',
    type: 'Software project',
    star: false
  },
  {
    id: 1,
    name: 'example (EX)',
    icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10418?size=medium',
    type: 'Software project',
    star: false
  }
];

export default function ProjectHeader() {
  const [projectList, setProjectList] = useState(projects);
  const [value, setValue] = useState(0);
  const { visible, setVisible, myRef } = UseOutsideAlerter(false);
  const handleClickOutside = () => setVisible(true);
  const refStar = projectList.map(() => createRef<HTMLDivElement>());

  const setProjectStar = (id: number) => {
    const index = projectList.findIndex((project) => project.id === id);
    projectList[index].star = !projectList[index].star;
    setProjectList(projectList);
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
      current.style.top = `${starPosition.y - 24}px`;
      current.style.left = `${starPosition.x - 292}px`;
    }
  };

  return (
    <div className={styles.projectHeader}>
      <header>
        <nav ref={myRef}>
          <div className={styles.menu}>
            <button type="button">
              <CgMenuGridR />
            </button>
          </div>
          <a href="/#">
            <div className={styles.logo}>
              <svg />
            </div>
          </a>
          <div className={styles.options}>
            <div className={styles.option}>
              <button type="button">
                <span className={styles.title}>Your work</span>
                <div className={styles.btn}>
                  <span>
                    <RiArrowDropDownLine />
                  </span>
                </div>
              </button>
            </div>
            {visible ? (
              <>
                <div className={styles.optionProjects}>
                  <button type="button" onClick={handleClickOutside}>
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
                      {/* <ul> */}
                      {projectList.map((project) => (
                        //   <li key={project.id}>
                        <a href="/#" target="_self" key={project.id}>
                          <span className={styles.iconSection}>
                            <div className={styles.iconContainer}>
                              <span className={styles.icon}>
                                <img src={project.icon} alt="icon" />
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
                        //   </li>
                      ))}
                      {/* </ul> */}
                    </div>
                    <div className={styles.bottom}>
                      <span className={styles.viewSection}>
                        <a href="/#">
                          <span className={styles.view}>
                            <span>View all projects</span>
                          </span>
                        </a>
                        <button type="button">
                          <span>Create project</span>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.option}>
                <button type="button" onClick={handleClickOutside}>
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
                <span className={styles.title}>Filters</span>
                <div className={styles.btn}>
                  <span>
                    <RiArrowDropDownLine />
                  </span>
                </div>
              </button>
            </div>
            <div className={styles.option}>
              <button type="button">
                <span className={styles.title}>Dashboards</span>
                <div className={styles.btn}>
                  <span>
                    <RiArrowDropDownLine />
                  </span>
                </div>
              </button>
            </div>
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
              <button type="button" className={styles.createBtn}>
                <span>Create</span>
              </button>
              <button type="button" className={styles.createIcon}>
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
        <PersonalProfile />
      </header>
    </div>
  );
}
