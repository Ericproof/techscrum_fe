import React, { useState, createRef } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import styles from './Project.module.scss';

const projects = [
  {
    id: 0,
    star: false,
    icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10418?size=small',
    name: 'example',
    key: 'EX',
    type: 'Team-managed software',
    lead: 'Evan Lin',
    avatar:
      'https://i2.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/EL-3.png?ssl=1'
  },
  {
    id: 1,
    star: false,
    icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10411?size=small',
    name: 'TECHSCRUM',
    key: 'TEC',
    type: 'Team-managed software',
    lead: 'Yiu Kitman',
    avatar:
      'https://i2.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/YK-3.png?ssl=1'
  },
  {
    id: 2,
    star: false,
    icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10412?size=small',
    name: 'Template',
    key: 'TEM',
    type: 'Company-managed software',
    lead: 'Yiu Kitman',
    avatar:
      'https://i2.wp.com/avatar-management--avatars.us-west-2.prod.public.atl-paas.net/initials/YK-3.png?ssl=1'
  }
];
export default function Project() {
  const [projectList, setProjectList] = useState(projects);
  const [value, setValue] = useState(0);
  const refStar = projectList.map(() => createRef<HTMLDivElement>());
  const refProfile = projectList.map(() => createRef<HTMLDivElement>());

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
  return (
    <div className={styles.projectPage}>
      <div className={styles.projectContainer}>
        <div className={styles.projectContent}>
          <div className={styles.header}>
            <div className={styles.title}>
              <h1>Projects</h1>
              <button type="button">Create project</button>
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
                {projectList.map((project) => (
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
                      <a href="/#">
                        <div className={styles.nameContent}>
                          <img src={project.icon} alt="icon" />
                          <span>{project.name}</span>
                        </div>
                      </a>
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
                                    <button type="button">View profile</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className={styles.button} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
