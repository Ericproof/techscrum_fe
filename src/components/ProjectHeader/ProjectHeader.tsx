import React, { useState, createRef } from 'react';
import { AiOutlineStar, AiFillStar, AiOutlinePlus } from 'react-icons/ai';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { CgMenuGridR } from 'react-icons/cg';
import { IoIosArrowDown } from 'react-icons/io';
import styles from './ProjectHeader.module.scss';

const projects = [
  {
    id: 0,
    name: 'TECHSCRUM(TEC)',
    icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10411?size=medium',
    type: 'Software project',
    star: false
  },
  {
    id: 1,
    name: 'example(EX)',
    icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10418?size=medium',
    type: 'Software project',
    star: false
  }
];
const users = [
  {
    name: 'Yiu Kitman',
    avatar:
      'https://i2.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/YK-3.png?ssl=1'
  }
];
export default function ProjectHeader() {
  const [projectDropdown, setProjectDropdown] = useState(false);
  const [projectList, setProjectList] = useState(projects);
  const [value, setValue] = useState(0);
  const [settingList, setSettingList] = useState(false);
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
      current.style.top = `${starPosition.y + 45}px`;
      current.style.left = `${starPosition.x - 33}px`;
    }
  };

  return (
    <header className={styles.projectHeader}>
      <nav>
        <div className={styles.menu}>
          <button type="button">
            <span>
              <CgMenuGridR />
            </span>
          </button>
        </div>
        <a href="/#">
          <div className={styles.logo}>
            <span>
              <img
                src="http://localhost:3000/static/media/logo.b93a2db84df580f82fcc33ce76cb76e5.svg"
                alt="icon"
              />
            </span>
          </div>
        </a>
        <div className={styles.options}>
          <div className={styles.yourWork}>
            <button type="button">
              <span className={styles.title}>Your work</span>
              <div className={styles.btn}>
                <span>
                  <IoIosArrowDown />
                </span>
              </div>
            </button>
          </div>
          {projectDropdown ? (
            <div className={styles.projectDetails}>
              <div className={styles.projects}>
                <button type="button" onClick={() => setProjectDropdown(false)}>
                  <span className={styles.title}>Projects</span>
                  <div className={styles.btn}>
                    <span>
                      <IoIosArrowDown />
                    </span>
                  </div>
                </button>
              </div>
              <div className={styles.dropdownSection}>
                <div className={styles.dropdownContainer}>
                  <div className={styles.top}>
                    <div className={styles.topContent}>
                      <span>RECENT</span>
                      <ul>
                        {projectList.map((project) => (
                          <li key={project.id}>
                            <a href="/#" target="_self">
                              <div className={styles.left}>
                                <span className={styles.iconSection}>
                                  <div className={styles.iconContainer}>
                                    <span className={styles.icon}>
                                      <span />
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
                                        className={styles.star}
                                        onClick={() => setProjectStar(project.id)}
                                      >
                                        <div className={styles.starContent}>
                                          <span>
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
                                        className={styles.star}
                                        onClick={() => setProjectStar(project.id)}
                                      >
                                        <div className={styles.starContent}>
                                          <span>
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
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
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
            </div>
          ) : (
            <div className={styles.projects}>
              <button type="button" onClick={() => setProjectDropdown(true)}>
                <span className={styles.title}>Projects</span>
                <div className={styles.btn}>
                  <span>
                    <IoIosArrowDown />
                  </span>
                </div>
              </button>
            </div>
          )}
          <div className={styles.filters}>
            <button type="button">
              <span className={styles.title}>Filters</span>
              <div className={styles.btn}>
                <span>
                  <IoIosArrowDown />
                </span>
              </div>
            </button>
          </div>
          <div className={styles.dashBoards}>
            <button type="button">
              <span className={styles.title}>Dashboards</span>
              <div className={styles.btn}>
                <span>
                  <IoIosArrowDown />
                </span>
              </div>
            </button>
          </div>
          <div className={styles.people}>
            <button type="button">
              <span className={styles.title}>People</span>
              <div className={styles.btn}>
                <span>
                  <IoIosArrowDown />
                </span>
              </div>
            </button>
          </div>
          <div className={styles.createIssue}>
            <button type="button" className={styles.createBtn}>
              <span>Create</span>
            </button>
            <button type="button" className={styles.createIcon}>
              <div className={styles.icon}>
                <span>
                  <AiOutlinePlus />
                </span>
              </div>
            </button>
          </div>
          <div className={styles.spaceSection}>
            <div className={styles.space} />
          </div>
        </div>
      </nav>
      {users.map((user) => (
        <div className={styles.rightSection}>
          {settingList ? (
            <>
              <div className={styles.avatarSection}>
                <div className={styles.avatarContainer}>
                  <button type="button" onClick={() => setSettingList(false)}>
                    <span>
                      <div className={styles.avatarContent}>
                        <span>
                          <img src={user.avatar} alt="avatar" />
                        </span>
                      </div>
                    </span>
                  </button>
                </div>
              </div>
              <div className={styles.settingDropdown}>
                <div className={styles.settingContainer}>
                  <div className={styles.settingContent}>
                    <div className={styles.settingTop} />
                    <div className={styles.settingDetails}>
                      <div className={styles.personal}>
                        <span>TECHSCRUM</span>
                        <a href="/#">
                          <div className={styles.title}>
                            <span>Personal settings</span>
                          </div>
                        </a>
                      </div>
                      <div className={styles.account}>
                        <span>{user.name}</span>
                        <a href="/#">
                          <div className={styles.title}>
                            <span>Profile</span>
                          </div>
                        </a>
                        <a href="/#">
                          <div className={styles.title}>
                            <span>Accounting settings</span>
                          </div>
                          <div className={styles.iconSection}>
                            <div className={styles.icon}>
                              <BsBoxArrowUpRight />
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className={styles.settingBottom}>
                      <div className={styles.logOutSection}>
                        <svg />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.avatarSection}>
              <div className={styles.avatarContainer}>
                <button type="button" onClick={() => setSettingList(false)}>
                  <span>
                    <div className={styles.avatarContent}>
                      <span>
                        <img src={user.avatar} alt="avatar" />
                      </span>
                    </div>
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </header>
  );
}
